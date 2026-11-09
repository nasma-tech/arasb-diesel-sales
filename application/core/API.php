<?php

global $router;

$router->mount('/webApi(/.*)?', function () use ($router) {
    $router->post('/checkDevice', function () {
        $allowedMacAddresses = [
            'c8:d9:d2:06:30:3f'
        ];
        $rawBody = file_get_contents('php://input');
        $input = json_decode($rawBody, true);
        if (!is_array($input)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid JSON.'
            ]);
            exit;
        }
        $macAddress = strtolower(trim($input['mac_address'] ?? ''));
        if (!preg_match('/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/', $macAddress)) {
            http_response_code(422);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid MAC address.'
            ]);
            exit;
        }
        if (!in_array($macAddress, $allowedMacAddresses, true)) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'This device is not authorized.'
            ]);
            exit;
        }
        echo json_encode([
            'success' => true,
            'message' => 'Device authorized.'
        ]);
        exit;
    });
});
