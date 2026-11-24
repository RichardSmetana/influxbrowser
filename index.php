<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

if (ib_password_hash() === null && !ib_is_private_ip(ib_client_ip())) {
    http_response_code(403);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Robots-Tag: noindex, nofollow');
    $title = ib_t('setup_private_title');
    $text = ib_t('setup_private');
    echo '<!DOCTYPE html><html lang="' . ib_lang() . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<link rel="icon" href="assets/favicon.ico" type="image/x-icon">'
        . '<title>' . htmlspecialchars($title, ENT_QUOTES) . '</title></head><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0c0e13;color:#f4f6fb;font-family:Segoe UI,sans-serif"><main style="max-width:520px;padding:28px"><h1 style="font-size:28px">'
        . htmlspecialchars($title, ENT_QUOTES) . '</h1><p style="color:#8b93a7;line-height:1.5">'
        . htmlspecialchars($text, ENT_QUOTES) . '</p></main></body></html>';
    exit;
}

$css = @filemtime(__DIR__ . '/assets/app.css') ?: time();
$js = @filemtime(__DIR__ . '/assets/app.js') ?: time();
?><!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Influx Browser</title>
<link rel="icon" href="assets/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="assets/favicon.jpg">
<link rel="stylesheet" href="assets/app.css?v=<?= (int) $css ?>">
</head>
<body>
<div id="app"></div>
<script src="assets/app.js?v=<?= (int) $js ?>"></script>
</body>
</html>
