<?php

if (!defined('INFLUX_BROWSER')) {
    http_response_code(404);
    exit;
}

return [
    'url' => 'http://127.0.0.1:8086',
    'org' => 'your-org',
    'token' => 'your-read-token',
    'user' => 'admin',
    'password_hash' => null,
    'totp_secret' => null,
    'totp_enabled' => false,
];
