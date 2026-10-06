<?php

namespace Packages\Security;

use Random\RandomException;

class Csrf
{
    /**
     * @throws RandomException
     */
    public function csrfTokenInput(): string
    {
        return '<input hidden required value="' . $this->setCsrfToken() . '" name="csrfToken">';
    }

    /**
     * @throws RandomException
     */
    public function setCsrfToken()
    {
        if (empty($_SESSION['csrfToken'])) {
            $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrfToken'];
    }

    public function csrfValidate(): bool|int
    {
        if (!isset($_POST['csrfToken']) || $_POST['csrfToken'] != $_SESSION["csrfToken"] || !$_SESSION["csrfToken"]) {
            echo "<b>Error:</b> [this form not validate]";
            return http_response_code(400);
        }
        unset($_POST['csrfToken']);
        return http_response_code(200);
    }
}