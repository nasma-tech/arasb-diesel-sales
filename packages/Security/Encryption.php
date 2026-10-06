<?php

namespace Packages\Security;

class Encryption
{
    public static function encrypt($string): string
    {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = $_ENV['HASH_SECRET_KEY'];
        $secret_iv = $_ENV['HASH_SECRET_IV'];
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
        return $output;
    }

    public static function decrypt($string): false|string
    {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = $_ENV['HASH_SECRET_KEY'];
        $secret_iv = $_ENV['HASH_SECRET_IV'];
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        return $output;
    }
}
