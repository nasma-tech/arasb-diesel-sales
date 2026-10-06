<?php

namespace Packages\Http;


use Packages\Enums\HttpRequestType;

class HttpClient
{
    public function send(
        string          $url,
        array           $data = [],
        array           $headers = [],
        HttpRequestType $method = HttpRequestType::GET,
        bool            $verifySSL = true,
    ): bool|string
    {
        $method = strtoupper($method->name);

        if ($method === 'GET' && !empty($data)) {
            $query = http_build_query($data);
            $url .= (str_contains($url, '?') ? '&' : '?') . $query;
        }

        $ch = curl_init($url);

        if (empty($headers)) {
            $headers = ['Content-Type: application/json'];
        }

        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CUSTOMREQUEST => $method,
        ];

        if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE']) && !empty($data)) {
            if (in_array('Content-Type: application/json', $headers)) {
                $options[CURLOPT_POSTFIELDS] = json_encode($data);
            } else {
                $options[CURLOPT_POSTFIELDS] = http_build_query($data);
            }
        }

        if (!$verifySSL) {
            $options[CURLOPT_SSL_VERIFYPEER] = false;
            $options[CURLOPT_SSL_VERIFYHOST] = false;
        }

        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new \Exception("cURL Error: {$error}");
        }

        curl_close($ch);
        return $response;
    }
}