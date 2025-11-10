<?php
// jwt_helper.php

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode($payload, $secret, $alg = 'HS256') {
    $header = json_encode(['typ' => 'JWT', 'alg' => $alg]);
    $segments = [];
    $segments[] = base64UrlEncode($header);
    $segments[] = base64UrlEncode(json_encode($payload));
    $signing_input = implode('.', $segments);

    $signature = hash_hmac('sha256', $signing_input, $secret, true);
    $segments[] = base64UrlEncode($signature);

    return implode('.', $segments);
}

function jwt_decode($jwt, $secret) {
    $tokens = explode('.', $jwt);
    if (count($tokens) != 3) {
        return false;
    }

    list($header64, $payload64, $sig64) = $tokens;
    $signature = base64UrlDecode($sig64);
    $valid_signature = hash_hmac('sha256', "$header64.$payload64", $secret, true);

    if (!hash_equals($valid_signature, $signature)) {
        return false;
    }

    return json_decode(base64UrlDecode($payload64), true);
}
