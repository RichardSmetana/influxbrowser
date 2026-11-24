<?php

declare(strict_types=1);

final class Totp
{
    private const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    public static function secret(): string
    {
        return self::encode(random_bytes(20));
    }

    public static function verify(string $secret, string $code, int $window = 1): bool
    {
        $code = preg_replace('/\s+/', '', $code) ?? '';
        if (!preg_match('/^\d{6}$/', $code)) {
            return false;
        }
        $key = self::decode($secret);
        $now = time();
        for ($step = -$window; $step <= $window; $step++) {
            if (hash_equals(self::code($key, $now + ($step * 30)), $code)) {
                return true;
            }
        }
        return false;
    }

    public static function uri(string $secret): string
    {
        $label = rawurlencode('Influx:admin');
        return 'otpauth://totp/' . $label
            . '?secret=' . rawurlencode($secret)
            . '&issuer=Influx&digits=6&period=30';
    }

    public static function code(string $key, ?int $time = null): string
    {
        $counter = intdiv($time ?? time(), 30);
        $binary = pack('N', 0) . pack('N', $counter);
        $hmac = hash_hmac('sha1', $binary, $key, true);
        $offset = ord($hmac[19]) & 0x0f;
        $value = (
            ((ord($hmac[$offset]) & 0x7f) << 24)
            | ((ord($hmac[$offset + 1]) & 0xff) << 16)
            | ((ord($hmac[$offset + 2]) & 0xff) << 8)
            | (ord($hmac[$offset + 3]) & 0xff)
        ) % 1000000;
        return str_pad((string) $value, 6, '0', STR_PAD_LEFT);
    }

    public static function encode(string $bytes): string
    {
        $bits = '';
        $length = strlen($bytes);
        for ($i = 0; $i < $length; $i++) {
            $bits .= str_pad(decbin(ord($bytes[$i])), 8, '0', STR_PAD_LEFT);
        }
        $out = '';
        foreach (str_split($bits, 5) as $chunk) {
            if (strlen($chunk) < 5) {
                $chunk = str_pad($chunk, 5, '0', STR_PAD_RIGHT);
            }
            $out .= self::ALPHABET[bindec($chunk)];
        }
        return $out;
    }

    public static function decode(string $secret): string
    {
        $secret = strtoupper((string) preg_replace('/[^A-Za-z2-7]/', '', $secret));
        if ($secret === '' || strlen($secret) < 16) {
            throw new InvalidArgumentException('secret');
        }
        $bits = '';
        $length = strlen($secret);
        for ($i = 0; $i < $length; $i++) {
            $pos = strpos(self::ALPHABET, $secret[$i]);
            if ($pos === false) {
                throw new InvalidArgumentException('secret');
            }
            $bits .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
        }
        $out = '';
        foreach (str_split($bits, 8) as $chunk) {
            if (strlen($chunk) === 8) {
                $out .= chr(bindec($chunk));
            }
        }
        return $out;
    }
}
