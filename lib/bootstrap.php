<?php

declare(strict_types=1);

define('INFLUX_BROWSER', true);

function ib_config_path(): string
{
    return dirname(__DIR__) . '/config.php';
}

function ib_load_config(bool $fresh = false): array
{
    static $cfg = null;
    if ($fresh) {
        $cfg = null;
    }
    if (is_array($cfg)) {
        return $cfg;
    }

    $path = ib_config_path();
    if (!is_file($path)) {
        $cfg = [
            'url' => 'http://127.0.0.1:8086',
            'org' => '',
            'token' => '',
            'password_hash' => null,
            'totp_secret' => null,
            'totp_enabled' => false,
        ];
        return $cfg;
    }

    $loaded = require $path;
    if (!is_array($loaded)) {
        throw new RuntimeException(ib_t('config_invalid'));
    }

    $cfg = array_merge([
        'url' => 'http://127.0.0.1:8086',
        'org' => '',
        'token' => '',
        'user' => 'admin',
        'password_hash' => null,
        'totp_secret' => null,
        'totp_enabled' => false,
    ], $loaded);

    return $cfg;
}

function ib_save_config(array $cfg): void
{
    $current = ib_load_config();
    $enabled = array_key_exists('totp_enabled', $cfg)
        ? (bool) $cfg['totp_enabled']
        : !empty($current['totp_enabled']);
    $secret = array_key_exists('totp_secret', $cfg)
        ? $cfg['totp_secret']
        : ($current['totp_secret'] ?? null);
    if (!$enabled) {
        $secret = null;
    }
    if ($enabled && (!is_string($secret) || !preg_match('/^[A-Z2-7]{32}$/', $secret))) {
        throw new RuntimeException(ib_t('config_invalid'));
    }

    $cfg = [
        'url' => (string) ($cfg['url'] ?? ''),
        'org' => (string) ($cfg['org'] ?? ''),
        'token' => (string) ($cfg['token'] ?? ''),
        'user' => 'admin',
        'password_hash' => $cfg['password_hash'] ?? null,
        'totp_secret' => $enabled ? $secret : null,
        'totp_enabled' => $enabled,
    ];

    $php = "<?php\n\nif (!defined('INFLUX_BROWSER')) {\n    http_response_code(404);\n    exit;\n}\n\nreturn " . var_export($cfg, true) . ";\n";
    $path = ib_config_path();
    if (file_put_contents($path, $php, LOCK_EX) === false) {
        throw new RuntimeException(ib_t('config_save'));
    }
    @chmod($path, 0660);
    @chgrp($path, 'www-data');
    ib_load_config(true);
}

function ib_client_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '');
}

function ib_is_private_ip(string $ip): bool
{
    if (filter_var($ip, FILTER_VALIDATE_IP) === false) {
        return false;
    }

    return filter_var(
        $ip,
        FILTER_VALIDATE_IP,
        FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
    ) === false;
}

function ib_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function ib_out(array $data, int $code = 200): never
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ib_session_path(): string
{
    $dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/'));
    $dir = rtrim($dir, '/');
    return $dir === '' ? '/' : $dir;
}

function ib_session_secure(): bool
{
    return !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
}

function ib_session_ttl(): int
{
    return 60 * 60 * 24 * 30;
}

function ib_session_clear_cookie(): void
{
    setcookie('influxbrowser', '', [
        'expires' => time() - 3600,
        'path' => ib_session_path(),
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => ib_session_secure(),
    ]);
}

function ib_session_touch(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE || session_id() === '') {
        return;
    }
    setcookie(session_name(), session_id(), [
        'expires' => time() + ib_session_ttl(),
        'path' => ib_session_path(),
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => ib_session_secure(),
    ]);
}

function ib_session_check(): void
{
    $user = ($_SESSION['ib_user'] ?? null) === 'admin';
    $ok = ($_SESSION['ib_ok'] ?? null) === true && $user;
    $passwordOk = ($_SESSION['ib_pw_ok'] ?? null) === true && $user;
    $pending = $_SESSION['ib_totp_pending'] ?? null;
    if (!is_string($pending) || preg_match('/^[A-Z2-7]{32}$/', $pending) !== 1) {
        $pending = null;
    }

    $_SESSION = [];
    if ($user) {
        $_SESSION['ib_user'] = 'admin';
    }
    if ($ok) {
        $_SESSION['ib_ok'] = true;
    }
    if ($passwordOk) {
        $_SESSION['ib_pw_ok'] = true;
    }
    if ($pending !== null) {
        $_SESSION['ib_totp_pending'] = $pending;
    }
}

function ib_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $incoming = $_COOKIE['influxbrowser'] ?? '';
    if (!is_string($incoming) || ($incoming !== '' && preg_match('/^[A-Za-z0-9,-]{16,128}$/', $incoming) !== 1)) {
        ib_session_clear_cookie();
        unset($_COOKIE['influxbrowser']);
    }

    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.gc_maxlifetime', (string) ib_session_ttl());
    session_name('influxbrowser');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => ib_session_path(),
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => ib_session_secure(),
    ]);
    session_start();
    ib_session_check();
    if (!empty($_SESSION['ib_ok']) || !empty($_SESSION['ib_pw_ok'])) {
        ib_session_touch();
    }
}

function ib_password_hash(): ?string
{
    $hash = ib_load_config()['password_hash'] ?? null;
    return is_string($hash) && $hash !== '' ? $hash : null;
}

function ib_logged_in(): bool
{
    $hash = ib_password_hash();
    if ($hash === null) {
        return false;
    }
    ib_session_start();
    return !empty($_SESSION['ib_ok']);
}

function ib_totp_enabled(): bool
{
    $cfg = ib_load_config();
    return !empty($cfg['totp_enabled'])
        && is_string($cfg['totp_secret'] ?? null)
        && preg_match('/^[A-Z2-7]{32}$/', $cfg['totp_secret']) === 1;
}

function ib_guard(): void
{
    if (($_SERVER['HTTP_X_INFLUX_BROWSER'] ?? '') !== '1') {
        ib_out(['error' => ib_t('bad_call')], 403);
    }

    $referer = (string) ($_SERVER['HTTP_REFERER'] ?? '');
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    $host = (string) ($_SERVER['HTTP_HOST'] ?? '');
    $dir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
    $prefix = ($https ? 'https://' : 'http://') . $host . $dir . '/';
    if ($host === '' || !str_starts_with($referer, $prefix)) {
        ib_out(['error' => ib_t('bad_call')], 403);
    }
}

function ib_lang(): string
{
    $lang = strtolower((string) ($_SERVER['HTTP_X_INFLUX_LANG'] ?? ''));
    if ($lang === 'de' || $lang === 'en') {
        return $lang;
    }
    $accept = strtolower((string) ($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? ''));
    return str_starts_with($accept, 'de') ? 'de' : 'en';
}

function ib_t(string $key, array $vars = []): string
{
    $messages = [
        'bad_call' => ['de' => 'Ungültiger Aufruf.', 'en' => 'Invalid request.'],
        'post_required' => ['de' => 'POST erwartet.', 'en' => 'POST required.'],
        'lan_only' => ['de' => 'Ohne Zugangspasswort ist der Browser nur im lokalen Netz erreichbar.', 'en' => 'Without an access password the browser is only available on the local network.'],
        'setup_private_title' => ['de' => 'Einrichtung nur im privaten Netz', 'en' => 'Setup only on a private network'],
        'setup_private' => ['de' => 'Die Ersteinrichtung ist nur über eine private Adresse erreichbar: localhost, 10.0.0.0/8, 172.16.0.0/12 oder 192.168.0.0/16. Öffne die Seite im lokalen Netz, Benutzername admin, und lege dort das Passwort fest.', 'en' => 'First-time setup is only reachable from a private address: localhost, 10.0.0.0/8, 172.16.0.0/12, or 192.168.0.0/16. Open the page on the local network, user name admin, and set the password there.'],
        'setup_required' => ['de' => 'Zuerst muss im privaten Netz ein Passwort festgelegt werden.', 'en' => 'A password must be set from the private network first.'],
        'setup_done' => ['de' => 'Das Passwort ist bereits festgelegt.', 'en' => 'The password is already set.'],
        'password_mismatch' => ['de' => 'Die Passwörter stimmen nicht überein.', 'en' => 'The passwords do not match.'],
        'bad_login' => ['de' => 'Benutzer oder Passwort ist falsch.', 'en' => 'User or password is wrong.'],
        'bad_totp' => ['de' => 'Der Code ist falsch oder abgelaufen.', 'en' => 'The code is wrong or expired.'],
        'bad_totp_off' => ['de' => 'Passwort oder Code ist falsch.', 'en' => 'Password or code is wrong.'],
        'totp_required' => ['de' => 'Zuerst Passwort, danach den Code.', 'en' => 'Password first, then the code.'],
        'totp_active' => ['de' => '2FA ist bereits aktiv.', 'en' => '2FA is already on.'],
        'totp_missing' => ['de' => 'Zuerst einen neuen Schlüssel erzeugen.', 'en' => 'Create a new key first.'],
        'bad_password' => ['de' => 'Passwort ist falsch.', 'en' => 'Password is wrong.'],
        'login_required' => ['de' => 'Anmeldung nötig.', 'en' => 'Sign-in required.'],
        'settings_lan' => ['de' => 'Einstellungen lassen sich nur aus dem lokalen Netz ändern.', 'en' => 'Settings can only be changed from the local network.'],
        'bad_url' => ['de' => 'URL muss mit http:// oder https:// beginnen.', 'en' => 'URL must start with http:// or https://.'],
        'need_org_token' => ['de' => 'Organisation und Token werden gebraucht.', 'en' => 'Organization and token are required.'],
        'password_short' => ['de' => 'Das Zugangspasswort braucht mindestens 8 Zeichen.', 'en' => 'The access password needs at least 8 characters.'],
        'unknown_action' => ['de' => 'Unbekannte Aktion.', 'en' => 'Unknown action.'],
        'internal' => ['de' => 'Interner Fehler.', 'en' => 'Internal error.'],
        'missing_param' => ['de' => 'Parameter {key} fehlt.', 'en' => 'Parameter {key} is missing.'],
        'bad_influx_url' => ['de' => 'Die Influx-URL muss mit http:// oder https:// beginnen.', 'en' => 'The Influx URL must start with http:// or https://.'],
        'missing_token_org' => ['de' => 'Token oder Organisation fehlt.', 'en' => 'Token or organization is missing.'],
        'bad_aggregate' => ['de' => 'Unbekannte Aggregation.', 'en' => 'Unknown aggregation.'],
        'bad_window' => ['de' => 'Fenster für die Aggregation ist ungültig.', 'en' => 'Aggregation window is invalid.'],
        'empty_query' => ['de' => 'Die Abfrage ist leer.', 'en' => 'The query is empty.'],
        'query_long' => ['de' => 'Die Abfrage ist zu lang.', 'en' => 'The query is too long.'],
        'query_blocked' => ['de' => 'Diese Abfrage ist im Browser nicht erlaubt. Es sind nur Leseabfragen möglich.', 'en' => 'This query is not allowed in the browser. Only read queries are possible.'],
        'bad_json' => ['de' => 'InfluxDB hat keine JSON-Antwort geliefert (HTTP {status}).', 'en' => 'InfluxDB did not return JSON (HTTP {status}).'],
        'unreachable' => ['de' => 'InfluxDB ist nicht erreichbar: {url}', 'en' => 'InfluxDB is not reachable: {url}'],
        'influx_message' => ['de' => 'InfluxDB: {message}', 'en' => 'InfluxDB: {message}'],
        'influx_http' => ['de' => 'InfluxDB HTTP {status}: {body}', 'en' => 'InfluxDB HTTP {status}: {body}'],
        'influx_status' => ['de' => 'InfluxDB HTTP {status}', 'en' => 'InfluxDB HTTP {status}'],
        'invalid_name' => ['de' => '{label} ist ungültig.', 'en' => '{label} is invalid.'],
        'name_long' => ['de' => '{label} ist zu lang.', 'en' => '{label} is too long.'],
        'bad_range' => ['de' => 'Zeitraum ist ungültig.', 'en' => 'Time range is invalid.'],
        'bad_time' => ['de' => 'Zeitpunkt ist ungültig.', 'en' => 'Timestamp is invalid.'],
        'name_bucket' => ['de' => 'Bucket', 'en' => 'Bucket'],
        'name_measurement' => ['de' => 'Measurement', 'en' => 'Measurement'],
        'name_field' => ['de' => 'Feld', 'en' => 'Field'],
        'name_tag' => ['de' => 'Tag', 'en' => 'Tag'],
        'name_tag_value' => ['de' => 'Tag-Wert', 'en' => 'Tag value'],
        'config_invalid' => ['de' => 'Konfiguration ist ungültig.', 'en' => 'Configuration is invalid.'],
        'config_save' => ['de' => 'Konfiguration konnte nicht gespeichert werden.', 'en' => 'Configuration could not be saved.'],
    ];
    $lang = ib_lang();
    $text = $messages[$key][$lang] ?? $messages[$key]['en'] ?? $key;
    foreach ($vars as $name => $value) {
        $text = str_replace('{' . $name . '}', (string) $value, $text);
    }
    return $text;
}
