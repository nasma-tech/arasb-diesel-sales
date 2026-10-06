<?php

namespace Packages\Http;

class Request
{
    public
    function getClientRequestInfo(): array
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ipList[0]);
        }

        $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http");
        $url .= "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

        return [
            'ipAddress' => strval($ip),
            'urlAddress' => $url
        ];
    }

    public
    function getBearerAuthorizeHeader(bool $returnNotAccessHttp = false): array|false|string|null
    {
        $authorize = (isset(getallheaders()['Authorization']) ? str_replace(['Bearer ', ' Bearer ', 'Bearer'], '', getallheaders()['Authorization']) : null);
        if ($returnNotAccessHttp) {
            if ($authorize) {
                return $authorize;
            } else {
                http_response_code(401);
                return false;
            }
        } else {
            return $authorize;
        }
    }

    public
    function authorizationApiRequest($accessToken): bool
    {
        $getClientRequestInfo = $this->getClientRequestInfo();
        if ($this->getBearerAuthorizeHeader(true) == $accessToken) {
            $this->callApiLog($getClientRequestInfo['urlAddress'], $getClientRequestInfo['ipAddress'], 200, true);
            return true;
        }
        http_response_code(401);
        $this->callApiLog($getClientRequestInfo['urlAddress'], $getClientRequestInfo['ipAddress'], 401, false);
        return false;
    }

    public
    function callApiLog(string $apiMethod, string $remoteAddress, int $httpStatus, bool $status): bool
    {
        //transfer to mongodb
//        return ApiLogModel::query()->create([
//            "remote_address" => $remoteAddress,
//            "http_status" => $httpStatus,
//            "api_method" => $apiMethod,
//            "status" => $status
//        ])->save();
        return true;
    }
}