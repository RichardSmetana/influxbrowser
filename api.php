<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/Influx.php';
require __DIR__ . '/lib/Totp.php';
require __DIR__ . '/lib/Qr.php';

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');

$action = (string) ($_GET['action'] ?? '');

try {
    ib_guard();

    if ($action === 'session') {
        $logged = ib_logged_in();
        $locked = ib_password_hash() !== null;
        $needTotp = false;
        if ($locked) {
            ib_session_start();
            $needTotp = !$logged && !empty($_SESSION['ib_pw_ok']) && ib_totp_enabled();
        }
        $payload = [
            'ok' => true,
            'auth' => $logged,
            'locked' => $locked,
            'needsSetup' => !$locked,
            'needTotp' => $needTotp,
            'private' => ib_is_private_ip(ib_client_ip()),
            'user' => 'admin',
            'canConfigure' => $logged && ib_is_private_ip(ib_client_ip()),
        ];
        if ($logged) {
            $cfg = ib_load_config();
            $payload['org'] = (string) $cfg['org'];
            $payload['url'] = (string) $cfg['url'];
            $payload['hasToken'] = (string) $cfg['token'] !== '';
            $payload['totp'] = ib_totp_enabled();
        }
        ib_out($payload);
    }

    if (ib_password_hash() === null && !ib_is_private_ip(ib_client_ip())) {
        ib_out(['error' => ib_t('setup_private')], 403);
    }

    if ($action === 'setup') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        if (ib_password_hash() !== null) {
            ib_out(['error' => ib_t('setup_done')], 409);
        }
        if (!ib_is_private_ip(ib_client_ip())) {
            ib_out(['error' => ib_t('setup_private')], 403);
        }
        $body = ib_json_body();
        $password = (string) ($body['password'] ?? '');
        $confirm = (string) ($body['confirm'] ?? '');
        if (strlen($password) < 8) {
            ib_out(['error' => ib_t('password_short')], 400);
        }
        if ($password !== $confirm) {
            ib_out(['error' => ib_t('password_mismatch')], 400);
        }
        $cfg = ib_load_config();
        ib_save_config([
            'url' => $cfg['url'],
            'org' => $cfg['org'],
            'token' => $cfg['token'],
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ]);
        ib_session_start();
        session_regenerate_id(true);
        $_SESSION['ib_ok'] = true;
        $_SESSION['ib_user'] = 'admin';
        ib_session_touch();
        ib_out(['ok' => true, 'user' => 'admin']);
    }

    if ($action === 'login') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        $hash = ib_password_hash();
        if ($hash === null) {
            ib_out(['error' => ib_t('setup_required')], 403);
        }
        $body = ib_json_body();
        $user = (string) ($body['user'] ?? '');
        $password = (string) ($body['password'] ?? '');
        if ($user !== 'admin' || !password_verify($password, $hash)) {
            ib_out(['error' => ib_t('bad_login')], 401);
        }
        ib_session_start();
        session_regenerate_id(true);
        unset($_SESSION['ib_totp_pending']);
        if (ib_totp_enabled()) {
            unset($_SESSION['ib_ok']);
            $_SESSION['ib_pw_ok'] = true;
            $_SESSION['ib_user'] = 'admin';
            ib_session_touch();
            ib_out(['ok' => true, 'auth' => false, 'needTotp' => true, 'user' => 'admin']);
        }
        unset($_SESSION['ib_pw_ok']);
        $_SESSION['ib_ok'] = true;
        $_SESSION['ib_user'] = 'admin';
        ib_session_touch();
        ib_out(['ok' => true, 'auth' => true, 'user' => 'admin']);
    }

    if ($action === 'totp') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        ib_session_start();
        if (empty($_SESSION['ib_pw_ok']) || !ib_totp_enabled()) {
            ib_out(['error' => ib_t('totp_required')], 401);
        }
        $body = ib_json_body();
        $secret = (string) (ib_load_config()['totp_secret'] ?? '');
        if (!Totp::verify($secret, (string) ($body['code'] ?? ''))) {
            ib_out(['error' => ib_t('bad_totp')], 401);
        }
        session_regenerate_id(true);
        unset($_SESSION['ib_pw_ok'], $_SESSION['ib_totp_pending']);
        $_SESSION['ib_ok'] = true;
        $_SESSION['ib_user'] = 'admin';
        ib_session_touch();
        ib_out(['ok' => true, 'auth' => true, 'user' => 'admin']);
    }

    if ($action === 'logout') {
        ib_session_start();
        $_SESSION = [];
        session_destroy();
        ib_session_clear_cookie();
        ib_out(['ok' => true]);
    }

    if (!ib_logged_in()) {
        ib_out(['error' => ib_t('login_required'), 'auth' => false], 401);
    }

    if ($action === 'buckets') {
        ib_out(['buckets' => InfluxClient::fromConfig()->buckets()]);
    }

    if ($action === 'measurements') {
        ib_out(['measurements' => InfluxClient::fromConfig()->measurements(ib_query('bucket'))]);
    }

    if ($action === 'fields') {
        $client = InfluxClient::fromConfig();
        ib_out([
            'fields' => $client->fieldKeys(ib_query('bucket'), ib_query('measurement')),
            'tags' => $client->tagKeys(ib_query('bucket'), ib_query('measurement')),
        ]);
    }

    if ($action === 'tagValues') {
        ib_out([
            'values' => InfluxClient::fromConfig()->tagValues(
                ib_query('bucket'),
                ib_query('measurement'),
                ib_query('tag')
            ),
        ]);
    }

    if ($action === 'browse') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        ib_out(InfluxClient::fromConfig()->browse(ib_json_body()));
    }

    if ($action === 'query') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        $body = ib_json_body();
        ib_out(InfluxClient::fromConfig()->query((string) ($body['flux'] ?? '')));
    }

    if ($action === 'save') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        if (!ib_is_private_ip(ib_client_ip())) {
            ib_out(['error' => ib_t('settings_lan')], 403);
        }
        $body = ib_json_body();
        $cfg = ib_load_config();
        $url = trim((string) ($body['url'] ?? $cfg['url']));
        $org = trim((string) ($body['org'] ?? $cfg['org']));
        $token = trim((string) ($body['token'] ?? ''));
        if ($token === '') {
            $token = (string) $cfg['token'];
        }
        if (!preg_match('#^https?://#i', $url)) {
            ib_out(['error' => ib_t('bad_url')], 400);
        }
        if ($org === '' || $token === '') {
            ib_out(['error' => ib_t('need_org_token')], 400);
        }

        $hash = $cfg['password_hash'] ?? null;
        if (!is_string($hash) || $hash === '') {
            ib_out(['error' => ib_t('setup_required')], 403);
        }
        $password = (string) ($body['password'] ?? '');
        if ($password !== '') {
            if (strlen($password) < 8) {
                ib_out(['error' => ib_t('password_short')], 400);
            }
            $hash = password_hash($password, PASSWORD_DEFAULT);
        }

        $client = new InfluxClient($url, $token, $org);
        $buckets = $client->buckets();

        ib_save_config([
            'url' => $url,
            'org' => $org,
            'token' => $token,
            'password_hash' => $hash,
        ]);

        ib_session_start();
        if (is_string($hash) && $hash !== '') {
            $_SESSION['ib_ok'] = true;
            $_SESSION['ib_user'] = 'admin';
            ib_session_touch();
        } else {
            unset($_SESSION['ib_ok']);
        }

        ib_out([
            'ok' => true,
            'buckets' => count($buckets),
            'locked' => is_string($hash) && $hash !== '',
        ]);
    }

    if ($action === 'totp-begin' || $action === 'totp-enable' || $action === 'totp-disable') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            ib_out(['error' => ib_t('post_required')], 405);
        }
        if (!ib_is_private_ip(ib_client_ip())) {
            ib_out(['error' => ib_t('settings_lan')], 403);
        }
        ib_session_start();
        $body = ib_json_body();

        if ($action === 'totp-begin') {
            if (ib_totp_enabled()) {
                ib_out(['error' => ib_t('totp_active')], 409);
            }
            $secret = Totp::secret();
            $_SESSION['ib_totp_pending'] = $secret;
            ib_out([
                'ok' => true,
                'secret' => $secret,
                'svg' => Qr::svg(Totp::uri($secret)),
            ]);
        }

        if ($action === 'totp-enable') {
            $pending = $_SESSION['ib_totp_pending'] ?? '';
            if (!is_string($pending) || !preg_match('/^[A-Z2-7]{32}$/', $pending)) {
                ib_out(['error' => ib_t('totp_missing')], 400);
            }
            if (!Totp::verify($pending, (string) ($body['code'] ?? ''))) {
                ib_out(['error' => ib_t('bad_totp')], 401);
            }
            $cfg = ib_load_config();
            ib_save_config([
                'url' => $cfg['url'],
                'org' => $cfg['org'],
                'token' => $cfg['token'],
                'password_hash' => $cfg['password_hash'] ?? null,
                'totp_secret' => $pending,
                'totp_enabled' => true,
            ]);
            unset($_SESSION['ib_totp_pending']);
            ib_out(['ok' => true, 'totp' => true]);
        }

        $password = (string) ($body['password'] ?? '');
        $hash = ib_password_hash();
        $secret = (string) (ib_load_config()['totp_secret'] ?? '');
        if ($hash === null || !password_verify($password, $hash) || !Totp::verify($secret, (string) ($body['code'] ?? ''))) {
            ib_out(['error' => ib_t('bad_totp_off')], 401);
        }
        $cfg = ib_load_config();
        ib_save_config([
            'url' => $cfg['url'],
            'org' => $cfg['org'],
            'token' => $cfg['token'],
            'password_hash' => $cfg['password_hash'] ?? null,
            'totp_secret' => null,
            'totp_enabled' => false,
        ]);
        unset($_SESSION['ib_totp_pending']);
        ib_out(['ok' => true, 'totp' => false]);
    }

    ib_out(['error' => ib_t('unknown_action')], 404);
} catch (InfluxException $e) {
    ib_out(['error' => $e->getMessage()], 400);
} catch (Throwable $e) {
    ib_out(['error' => ib_t('internal')], 500);
}

function ib_query(string $key): string
{
    $value = $_GET[$key] ?? '';
    if (!is_string($value) || trim($value) === '') {
        ib_out(['error' => ib_t('missing_param', ['key' => $key])], 400);
    }
    return $value;
}
