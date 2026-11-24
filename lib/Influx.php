<?php

declare(strict_types=1);

final class InfluxException extends RuntimeException
{
}

final class InfluxClient
{
    public function __construct(
        private string $url,
        private string $token,
        private string $org,
    ) {
        $this->url = rtrim($url, '/');
        if (!preg_match('#^https?://#i', $this->url)) {
            throw new InfluxException(ib_t('bad_influx_url'));
        }
        if ($this->token === '' || $this->org === '') {
            throw new InfluxException(ib_t('missing_token_org'));
        }
    }

    public static function fromConfig(): self
    {
        $cfg = ib_load_config();
        return new self((string) $cfg['url'], (string) $cfg['token'], (string) $cfg['org']);
    }

    public function buckets(): array
    {
        $data = $this->json('GET', '/api/v2/buckets?limit=100');
        $out = [];
        foreach ($data['buckets'] ?? [] as $bucket) {
            if (!is_array($bucket)) {
                continue;
            }
            $seconds = 0;
            foreach ($bucket['retentionRules'] ?? [] as $rule) {
                if (is_array($rule)) {
                    $seconds = (int) ($rule['everySeconds'] ?? 0);
                }
            }
            $out[] = [
                'name' => (string) ($bucket['name'] ?? ''),
                'type' => (string) ($bucket['type'] ?? 'user'),
                'retention' => $seconds,
            ];
        }
        usort($out, fn($a, $b) => strcmp($a['name'], $b['name']));
        return $out;
    }

    public function measurements(string $bucket): array
    {
        $bucket = self::ident($bucket, 'bucket');
        $rows = $this->flux(
            "import \"influxdata/influxdb/schema\"\n"
            . 'schema.measurements(bucket: ' . self::fluxString($bucket) . ')'
        );
        return self::values($rows);
    }

    public function fieldKeys(string $bucket, string $measurement): array
    {
        $rows = $this->flux(
            "import \"influxdata/influxdb/schema\"\n"
            . 'schema.measurementFieldKeys(bucket: ' . self::fluxString(self::ident($bucket, 'bucket'))
            . ', measurement: ' . self::fluxString(self::ident($measurement, 'measurement')) . ')'
        );
        return self::values($rows);
    }

    public function tagKeys(string $bucket, string $measurement): array
    {
        $rows = $this->flux(
            "import \"influxdata/influxdb/schema\"\n"
            . 'schema.measurementTagKeys(bucket: ' . self::fluxString(self::ident($bucket, 'bucket'))
            . ', measurement: ' . self::fluxString(self::ident($measurement, 'measurement')) . ')'
        );
        $keys = [];
        foreach (self::values($rows) as $key) {
            if ($key === '' || str_starts_with($key, '_')) {
                continue;
            }
            $keys[] = $key;
        }
        return $keys;
    }

    public function tagValues(string $bucket, string $measurement, string $tag): array
    {
        $tag = self::ident($tag, 'tag');
        if (str_starts_with($tag, '_')) {
            return [];
        }
        $rows = $this->flux(
            "import \"influxdata/influxdb/schema\"\n"
            . 'schema.measurementTagValues(bucket: ' . self::fluxString(self::ident($bucket, 'bucket'))
            . ', measurement: ' . self::fluxString(self::ident($measurement, 'measurement'))
            . ', tag: ' . self::fluxString($tag) . ')'
        );
        return array_slice(self::values($rows), 0, 300);
    }

    public function browse(array $req): array
    {
        $bucket = self::ident((string) ($req['bucket'] ?? ''), 'bucket');
        $measurement = self::ident((string) ($req['measurement'] ?? ''), 'measurement');
        $start = self::timeBound((string) ($req['start'] ?? '-24h'), '-24h');
        $stop = trim((string) ($req['stop'] ?? ''));
        if ($stop !== '') {
            $stop = self::timeBound($stop, '');
        }

        $fields = [];
        foreach (array_slice((array) ($req['fields'] ?? []), 0, 40) as $field) {
            $field = trim((string) $field);
            if ($field !== '') {
                $fields[] = self::ident($field, 'field');
            }
        }

        $tags = [];
        if (is_array($req['tags'] ?? null)) {
            $n = 0;
            foreach ($req['tags'] as $key => $value) {
                if ($n >= 8) {
                    break;
                }
                $key = trim((string) $key);
                $value = trim((string) $value);
                if ($key === '' || $value === '' || str_starts_with($key, '_')) {
                    continue;
                }
                $tags[self::ident($key, 'tag')] = self::ident($value, 'tag_value');
                $n++;
            }
        }

        $fn = (string) ($req['aggregate'] ?? 'none');
        if (!in_array($fn, ['none', 'mean', 'max', 'min', 'last', 'minmax'], true)) {
            throw new InfluxException(ib_t('bad_aggregate'));
        }
        $every = trim((string) ($req['every'] ?? ''));
        if ($fn !== 'none') {
            if (!preg_match('/^(\d+)(s|m|h|d)$/', $every, $m) || (int) $m[1] < 1 || (int) $m[1] > 366) {
                throw new InfluxException(ib_t('bad_window'));
            }
        }

        $limit = (int) ($req['limit'] ?? 4000);
        $limit = max(1, min(8000, $limit));

        $base = 'from(bucket: ' . self::fluxString($bucket) . ")\n"
            . '  |> range(start: ' . $start . ($stop !== '' ? ', stop: ' . $stop : '') . ")\n"
            . '  |> filter(fn: (r) => r["_measurement"] == ' . self::fluxString($measurement) . ')';

        if ($fields) {
            $parts = [];
            foreach ($fields as $field) {
                $parts[] = 'r["_field"] == ' . self::fluxString($field);
            }
            $base .= "\n  |> filter(fn: (r) => " . implode(' or ', $parts) . ')';
        }
        foreach ($tags as $key => $value) {
            $base .= "\n  |> filter(fn: (r) => r[" . self::fluxString($key) . '] == ' . self::fluxString($value) . ')';
        }

        if ($fn === 'minmax') {
            $base .= "\n  |> filter(fn: (r) => types.isNumeric(v: r._value))";
            $flux = "import \"types\"\n"
                . "base = " . $base . "\n"
                . "minData = base\n"
                . "  |> aggregateWindow(every: " . $every . ", fn: min, createEmpty: false)\n"
                . "  |> set(key: \"band\", value: \"min\")\n"
                . "maxData = base\n"
                . "  |> aggregateWindow(every: " . $every . ", fn: max, createEmpty: false)\n"
                . "  |> set(key: \"band\", value: \"max\")\n"
                . "union(tables: [minData, maxData])\n"
                . "  |> sort(columns: [\"_time\"], desc: true)\n"
                . "  |> limit(n: " . $limit . ')';
        } else {
            $flux = $base;
            if (in_array($fn, ['mean', 'max', 'min'], true)) {
                $flux .= "\n  |> filter(fn: (r) => types.isNumeric(v: r._value))";
                $flux = "import \"types\"\n" . $flux;
            }
            if ($fn !== 'none') {
                $flux .= "\n  |> aggregateWindow(every: " . $every . ', fn: ' . $fn . ', createEmpty: false)';
            }
            $flux .= "\n  |> sort(columns: [\"_time\"], desc: true)";
            $flux .= "\n  |> limit(n: " . $limit . ')';
        }

        $rows = $this->flux($flux);
        $points = [];
        foreach ($rows as $row) {
            $tagsOut = [];
            $band = null;
            foreach ($row as $key => $value) {
                if (in_array($key, ['_time', '_value', '_field', '_measurement', '_start', '_stop'], true)) {
                    continue;
                }
                if (is_string($key) && str_starts_with($key, '_')) {
                    continue;
                }
                if ($value === null || $value === '') {
                    continue;
                }
                if ($key === 'band') {
                    $band = (string) $value;
                    continue;
                }
                $tagsOut[$key] = $value;
            }
            $point = [
                'time' => $row['_time'] ?? null,
                'field' => $row['_field'] ?? null,
                'value' => $row['_value'] ?? null,
                'measurement' => $row['_measurement'] ?? $measurement,
                'tags' => $tagsOut,
            ];
            if ($band === 'min' || $band === 'max') {
                $point['band'] = $band;
            }
            $points[] = $point;
        }

        $seriesCount = [];
        foreach ($points as $point) {
            $seriesKey = (string) ($point['field'] ?? '') . "\n" . json_encode($point['tags']);
            $seriesCount[$seriesKey] = ($seriesCount[$seriesKey] ?? 0) + 1;
        }

        return [
            'flux' => $flux,
            'points' => $points,
            'truncated' => $seriesCount !== [] && max($seriesCount) >= $limit,
            'limit' => $limit,
        ];
    }

    public function query(string $flux): array
    {
        $flux = trim($flux);
        if ($flux === '') {
            throw new InfluxException(ib_t('empty_query'));
        }
        if (strlen($flux) > 20000) {
            throw new InfluxException(ib_t('query_long'));
        }
        if (preg_match('/import\s+"[^"]*(?:http|socket|sql|experimental\/http)/i', $flux)
            || preg_match('/\b(?:to|http\.(?:get|post)|sql\.from|experimental\.to)\s*\(/i', $flux)) {
            throw new InfluxException(ib_t('query_blocked'));
        }

        $rows = $this->flux($flux);
        if (count($rows) > 8000) {
            $rows = array_slice($rows, 0, 8000);
            $truncated = true;
        } else {
            $truncated = false;
        }

        return [
            'columns' => self::columns($rows),
            'rows' => $rows,
            'truncated' => $truncated,
        ];
    }

    private function json(string $method, string $path): array
    {
        $res = $this->request($method, $path, null, [
            'Accept' => 'application/json',
        ]);
        $data = json_decode($res['body'], true);
        if (!is_array($data)) {
            throw new InfluxException(ib_t('bad_json', ['status' => (string) $res['status']]));
        }
        return $data;
    }

    private function flux(string $flux): array
    {
        $res = $this->request(
            'POST',
            '/api/v2/query?org=' . rawurlencode($this->org),
            $flux,
            [
                'Accept' => 'application/csv',
                'Content-Type' => 'application/vnd.flux',
            ]
        );
        if ($res['status'] !== 200) {
            throw new InfluxException(self::errorMessage($res));
        }
        return self::parseCsv($res['body']);
    }

    private function request(string $method, string $path, ?string $body, array $headers): array
    {
        $headers = array_merge([
            'Authorization' => 'Token ' . $this->token,
        ], $headers);

        $lines = [];
        foreach ($headers as $name => $value) {
            $lines[] = $name . ': ' . $value;
        }

        $http = [
            'method' => $method,
            'header' => implode("\r\n", $lines),
            'timeout' => 45,
            'ignore_errors' => true,
            'follow_location' => 0,
            'protocol_version' => 1.1,
        ];
        if ($body !== null) {
            $http['content'] = $body;
        }
        $context = stream_context_create(['http' => $http]);

        $url = $this->url . $path;
        $raw = @file_get_contents($url, false, $context);
        $status = 0;
        $responseHeaders = $http_response_header ?? [];
        if (isset($responseHeaders[0]) && preg_match('#\s(\d{3})\s#', $responseHeaders[0], $m)) {
            $status = (int) $m[1];
        }
        if ($raw === false && $status === 0) {
            throw new InfluxException(ib_t('unreachable', ['url' => $this->url]));
        }

        $text = $raw === false ? '' : $raw;
        if ($status >= 400) {
            throw new InfluxException(self::errorMessage(['status' => $status, 'body' => $text]));
        }

        return ['status' => $status, 'body' => $text];
    }

    private static function errorMessage(array $res): string
    {
        $body = (string) ($res['body'] ?? '');
        $decoded = json_decode($body, true);
        if (is_array($decoded) && isset($decoded['message'])) {
            return ib_t('influx_message', ['message' => (string) $decoded['message']]);
        }
        $body = trim($body);
        if ($body !== '') {
            return ib_t('influx_http', [
                'status' => (string) (int) ($res['status'] ?? 0),
                'body' => mb_substr($body, 0, 400),
            ]);
        }
        return ib_t('influx_status', ['status' => (string) (int) ($res['status'] ?? 0)]);
    }

    private static function parseCsv(string $csv): array
    {
        $rows = [];
        $header = null;
        $types = [];
        foreach (preg_split("/\r\n|\n|\r/", $csv) as $line) {
            if ($line === '' || str_starts_with($line, '#')) {
                if (str_starts_with($line, '#datatype,')) {
                    $types = str_getcsv($line);
                }
                if ($line === '') {
                    $header = null;
                }
                continue;
            }
            $cols = str_getcsv($line);
            if ($header === null) {
                $header = $cols;
                continue;
            }
            $assoc = [];
            foreach ($header as $i => $name) {
                if ($name === '' || $name === 'result' || $name === 'table') {
                    continue;
                }
                $raw = $cols[$i] ?? '';
                $type = $types[$i] ?? '';
                $assoc[$name] = self::cast($name, $raw, $type);
            }
            if ($assoc) {
                $rows[] = $assoc;
            }
        }
        return $rows;
    }

    private static function cast(string $name, string $raw, string $type): mixed
    {
        if ($raw === '') {
            return null;
        }
        $numericType = preg_match('/^(long|unsignedLong|double|float)$/', $type) === 1
            || preg_match('/double|long|float|unsigned/i', $type) === 1;
        $valueColumn = $name === '_value';
        if (($numericType || $valueColumn) && is_numeric($raw)) {
            return $raw + 0;
        }
        if ($type === 'boolean' || ($valueColumn && ($raw === 'true' || $raw === 'false'))) {
            return $raw === 'true';
        }
        return $raw;
    }

    private static function values(array $rows): array
    {
        $values = [];
        foreach ($rows as $row) {
            if (!array_key_exists('_value', $row) || $row['_value'] === null) {
                continue;
            }
            $values[] = (string) $row['_value'];
        }
        $values = array_values(array_unique($values));
        sort($values, SORT_NATURAL | SORT_FLAG_CASE);
        return $values;
    }

    private static function columns(array $rows): array
    {
        $cols = [];
        foreach ($rows as $row) {
            foreach ($row as $key => $_) {
                $cols[$key] = true;
            }
        }
        return array_keys($cols);
    }

    private static function fluxString(string $value): string
    {
        return '"' . str_replace(['\\', '"'], ['\\\\', '\\"'], $value) . '"';
    }

    private static function ident(string $value, string $label): string
    {
        $value = trim($value);
        $name = ib_t('name_' . $label);
        if ($value === '' || str_contains($value, "\n") || str_contains($value, "\r")) {
            throw new InfluxException(ib_t('invalid_name', ['label' => $name]));
        }
        if (strlen($value) > 200) {
            throw new InfluxException(ib_t('name_long', ['label' => $name]));
        }
        return $value;
    }

    private static function timeBound(string $value, string $fallback): string
    {
        $value = trim($value);
        if ($value === '') {
            return $fallback;
        }
        if (preg_match('/^-(\d+)(s|m|h|d|w)$/', $value, $m)) {
            $n = (int) $m[1];
            if ($n < 1 || $n > 3660) {
                throw new InfluxException(ib_t('bad_range'));
            }
            return '-' . $n . $m[2];
        }
        if (preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/', $value)) {
            return $value;
        }
        throw new InfluxException(ib_t('bad_time'));
    }
}
