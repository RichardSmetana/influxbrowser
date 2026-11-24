<?php

declare(strict_types=1);

final class Qr
{
    public static function svg(string $text): string
    {
        $modules = self::matrix($text);
        $size = count($modules);
        $quiet = 4;
        $full = $size + ($quiet * 2);
        $rects = '';
        for ($y = 0; $y < $size; $y++) {
            $x = 0;
            while ($x < $size) {
                if (!$modules[$y][$x]) {
                    $x++;
                    continue;
                }
                $start = $x;
                while ($x < $size && $modules[$y][$x]) {
                    $x++;
                }
                $rects .= '<rect x="' . ($start + $quiet) . '" y="' . ($y + $quiet) . '" width="' . ($x - $start) . '" height="1"/>';
            }
        }
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' . $full . ' ' . $full . '" shape-rendering="crispEdges">'
            . '<rect width="100%" height="100%" fill="#fff"/>'
            . '<g fill="#111">' . $rects . '</g></svg>';
    }

    public static function matrix(string $text): array
    {
        $bytes = array_values(unpack('C*', $text));
        $length = count($bytes);
        $version = self::version($length);
        $size = 17 + (4 * $version);
        $modules = array_fill(0, $size, array_fill(0, $size, false));
        $reserved = array_fill(0, $size, array_fill(0, $size, false));
        self::functionPatterns($modules, $reserved, $version, $size);
        $data = self::dataCodewords($bytes, $version);
        $bits = self::interleave($data, $version);
        $best = null;
        $bestScore = PHP_INT_MAX;
        $bestMask = 0;
        for ($mask = 0; $mask < 8; $mask++) {
            $canvas = $modules;
            $taken = $reserved;
            self::placeData($canvas, $taken, $bits, $mask, $size);
            self::format($canvas, $version, $mask, $size);
            $score = self::penalty($canvas, $size);
            if ($score < $bestScore) {
                $bestScore = $score;
                $best = $canvas;
                $bestMask = $mask;
            }
        }
        self::format($best, $version, $bestMask, $size);
        return $best;
    }

    private static function version(int $length): int
    {
        $capacity = [1 => 14, 2 => 26, 3 => 42, 4 => 62, 5 => 84, 6 => 106];
        foreach ($capacity as $version => $max) {
            if ($length <= $max) {
                return $version;
            }
        }
        throw new InvalidArgumentException('qr');
    }

    private static function functionPatterns(array &$modules, array &$reserved, int $version, int $size): void
    {
        $finder = function (int $row, int $col) use (&$modules, &$reserved, $size): void {
            for ($y = -1; $y <= 7; $y++) {
                for ($x = -1; $x <= 7; $x++) {
                    $yy = $row + $y;
                    $xx = $col + $x;
                    if ($yy < 0 || $xx < 0 || $yy >= $size || $xx >= $size) {
                        continue;
                    }
                    $dark = $x >= 0 && $x <= 6 && $y >= 0 && $y <= 6
                        && ($x === 0 || $x === 6 || $y === 0 || $y === 6 || ($x >= 2 && $x <= 4 && $y >= 2 && $y <= 4));
                    $modules[$yy][$xx] = $dark;
                    $reserved[$yy][$xx] = true;
                }
            }
        };
        $finder(0, 0);
        $finder(0, $size - 7);
        $finder($size - 7, 0);
        $centers = [2 => [6, 18], 3 => [6, 22], 4 => [6, 26], 5 => [6, 30], 6 => [6, 34]][$version] ?? [];
        foreach ($centers as $r) {
            foreach ($centers as $c) {
                if ($reserved[$r][$c]) {
                    continue;
                }
                for ($y = -2; $y <= 2; $y++) {
                    for ($x = -2; $x <= 2; $x++) {
                        $modules[$r + $y][$c + $x] = max(abs($x), abs($y)) !== 1;
                        $reserved[$r + $y][$c + $x] = true;
                    }
                }
            }
        }
        for ($i = 0; $i < $size; $i++) {
            $dark = $i % 2 === 0;
            if (!$reserved[6][$i]) {
                $modules[6][$i] = $dark;
                $reserved[6][$i] = true;
            }
            if (!$reserved[$i][6]) {
                $modules[$i][6] = $dark;
                $reserved[$i][6] = true;
            }
        }
        for ($i = 0; $i <= 8; $i++) {
            if ($i !== 6) {
                $reserved[8][$i] = true;
                $reserved[$i][8] = true;
            }
        }
        for ($i = 0; $i < 8; $i++) {
            $reserved[8][$size - 1 - $i] = true;
            $reserved[$size - 1 - $i][8] = true;
        }
        $modules[$size - 8][8] = true;
        $reserved[$size - 8][8] = true;
    }

    private static function dataCodewords(array $bytes, int $version): array
    {
        $capacity = [1 => 16, 2 => 28, 3 => 44, 4 => 64, 5 => 86, 6 => 108][$version];
        $bits = '0100' . str_pad(decbin(count($bytes)), 8, '0', STR_PAD_LEFT);
        foreach ($bytes as $byte) {
            $bits .= str_pad(decbin($byte), 8, '0', STR_PAD_LEFT);
        }
        $bits .= str_repeat('0', min(4, ($capacity * 8) - strlen($bits)));
        while (strlen($bits) % 8 !== 0) {
            $bits .= '0';
        }
        $pad = ['11101100', '00010001'];
        $p = 0;
        while (strlen($bits) < $capacity * 8) {
            $bits .= $pad[$p];
            $p ^= 1;
        }
        $out = [];
        foreach (str_split(substr($bits, 0, $capacity * 8), 8) as $chunk) {
            $out[] = bindec($chunk);
        }
        return $out;
    }

    private static function interleave(array $data, int $version): array
    {
        $plan = [
            1 => [[16, 10]],
            2 => [[28, 16]],
            3 => [[44, 26]],
            4 => [[32, 18], [32, 18]],
            5 => [[43, 24], [43, 24]],
            6 => [[27, 16], [27, 16], [27, 16], [27, 16]],
        ][$version];
        $blocks = [];
        $offset = 0;
        $maxData = 0;
        $maxEcc = 0;
        foreach ($plan as [$dataLen, $eccLen]) {
            $block = array_slice($data, $offset, $dataLen);
            $offset += $dataLen;
            $ecc = self::remainder($block, $eccLen);
            $blocks[] = [$block, $ecc];
            $maxData = max($maxData, count($block));
            $maxEcc = max($maxEcc, count($ecc));
        }
        $out = [];
        for ($i = 0; $i < $maxData; $i++) {
            foreach ($blocks as [$block, $_]) {
                if ($i < count($block)) {
                    $out[] = $block[$i];
                }
            }
        }
        for ($i = 0; $i < $maxEcc; $i++) {
            foreach ($blocks as [$_, $ecc]) {
                if ($i < count($ecc)) {
                    $out[] = $ecc[$i];
                }
            }
        }
        return $out;
    }

    private static function remainder(array $data, int $eccLen): array
    {
        $gen = [1];
        for ($i = 0; $i < $eccLen; $i++) {
            $gen = self::polyMul($gen, [1, self::gfPow(2, $i)]);
        }
        $msg = array_merge($data, array_fill(0, $eccLen, 0));
        for ($i = 0, $n = count($data); $i < $n; $i++) {
            $factor = $msg[$i];
            if ($factor === 0) {
                continue;
            }
            for ($j = 0, $g = count($gen); $j < $g; $j++) {
                $msg[$i + $j] ^= self::gfMul($gen[$j], $factor);
            }
        }
        return array_slice($msg, count($data));
    }

    private static function polyMul(array $a, array $b): array
    {
        $out = array_fill(0, count($a) + count($b) - 1, 0);
        foreach ($a as $i => $av) {
            foreach ($b as $j => $bv) {
                $out[$i + $j] ^= self::gfMul($av, $bv);
            }
        }
        return $out;
    }

    private static function gfMul(int $a, int $b): int
    {
        if ($a === 0 || $b === 0) {
            return 0;
        }
        return self::gfPow(2, (self::gfLog($a) + self::gfLog($b)) % 255);
    }

    private static function gfPow(int $base, int $exp): int
    {
        [$expTable] = self::gf();
        if ($base !== 2) {
            return self::gfMul($base, $exp === 0 ? 1 : self::gfPow($base, $exp - 1));
        }
        return $expTable[$exp % 255];
    }

    private static function gfLog(int $value): int
    {
        [, $logTable] = self::gf();
        return $logTable[$value];
    }

    private static function gf(): array
    {
        static $exp;
        static $log;
        if ($exp !== null) {
            return [$exp, $log];
        }
        $exp = [];
        $log = array_fill(0, 256, 0);
        $x = 1;
        for ($i = 0; $i < 255; $i++) {
            $exp[$i] = $x;
            $log[$x] = $i;
            $x <<= 1;
            if ($x & 0x100) {
                $x ^= 0x11d;
            }
        }
        for ($i = 255; $i < 512; $i++) {
            $exp[$i] = $exp[$i - 255];
        }
        return [$exp, $log];
    }

    private static function placeData(array &$modules, array $reserved, array $codewords, int $mask, int $size): void
    {
        $bits = '';
        foreach ($codewords as $word) {
            $bits .= str_pad(decbin($word), 8, '0', STR_PAD_LEFT);
        }
        $bits .= str_repeat('0', 7);
        $index = 0;
        $total = strlen($bits);
        $up = true;
        for ($right = $size - 1; $right >= 1; $right -= 2) {
            if ($right === 6) {
                $right--;
            }
            for ($vert = 0; $vert < $size; $vert++) {
                for ($j = 0; $j < 2; $j++) {
                    $x = $right - $j;
                    $y = $up ? ($size - 1 - $vert) : $vert;
                    if ($reserved[$y][$x]) {
                        continue;
                    }
                    $bit = $index < $total && $bits[$index] === '1';
                    $index++;
                    if (self::mask($mask, $y, $x)) {
                        $bit = !$bit;
                    }
                    $modules[$y][$x] = $bit;
                }
            }
            $up = !$up;
        }
    }

    private static function mask(int $mask, int $y, int $x): bool
    {
        return match ($mask) {
            0 => ($y + $x) % 2 === 0,
            1 => $y % 2 === 0,
            2 => $x % 3 === 0,
            3 => ($y + $x) % 3 === 0,
            4 => (intdiv($y, 2) + intdiv($x, 3)) % 2 === 0,
            5 => (($y * $x) % 2) + (($y * $x) % 3) === 0,
            6 => ((($y * $x) % 2) + (($y * $x) % 3)) % 2 === 0,
            default => ((($y + $x) % 2) + (($y * $x) % 3)) % 2 === 0,
        };
    }

    private static function format(array &$modules, int $version, int $mask, int $size): void
    {
        $data = $mask;
        $rem = $data << 10;
        for ($i = 14; $i >= 10; $i--) {
            if ($rem & (1 << $i)) {
                $rem ^= 0x537 << ($i - 10);
            }
        }
        $info = (($data << 10) | $rem) ^ 0x5412;
        $voffset = 0;
        $hoffset = 0;
        for ($i = 0; $i < 8; $i++) {
            $vbit = (bool) (($info >> $i) & 1);
            $hbit = (bool) (($info >> (14 - $i)) & 1);
            if ($i === 6) {
                $voffset = 1;
                $hoffset = 1;
            }
            $modules[$i + $voffset][8] = $vbit;
            $modules[8][$i + $hoffset] = $hbit;
            $modules[8][$size - 1 - $i] = $vbit;
            $modules[$size - 1 - $i][8] = $hbit;
        }
        $modules[$size - 8][8] = true;
    }

    private static function penalty(array $modules, int $size): int
    {
        $score = 0;
        $run = function (array $line) use (&$score): void {
            $count = 1;
            $n = count($line);
            for ($i = 1; $i < $n; $i++) {
                if ($line[$i] === $line[$i - 1]) {
                    $count++;
                    if ($count === 5) {
                        $score += 3;
                    } elseif ($count > 5) {
                        $score++;
                    }
                } else {
                    $count = 1;
                }
            }
        };
        for ($y = 0; $y < $size; $y++) {
            $run($modules[$y]);
            $col = [];
            for ($x = 0; $x < $size; $x++) {
                $col[] = $modules[$x][$y];
            }
            $run($col);
        }
        for ($y = 0; $y < $size - 1; $y++) {
            for ($x = 0; $x < $size - 1; $x++) {
                $v = $modules[$y][$x];
                if ($v === $modules[$y][$x + 1] && $v === $modules[$y + 1][$x] && $v === $modules[$y + 1][$x + 1]) {
                    $score += 3;
                }
            }
        }
        $dark = 0;
        foreach ($modules as $row) {
            foreach ($row as $cell) {
                if ($cell) {
                    $dark++;
                }
            }
        }
        $score += intdiv(abs((int) ((100 * $dark) / ($size * $size)) - 50), 5) * 10;
        return $score;
    }
}
