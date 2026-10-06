<?php

function selfSendRequest($apiRoute, $token = '', $header = ['Content-Type: application/json', 'Accept: application/json']): void
{
    if ($token) {
        $header[] = "Authorization: Bearer $token";
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://executives.mammut-erp.com/webApi/' . $apiRoute);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}