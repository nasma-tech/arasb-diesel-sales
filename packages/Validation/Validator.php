<?php

namespace Packages\Validation;

class Validator
{
    public
    function validatePhoneNumber(int $phone): false|int
    {
        return preg_match('/^09\d{9}$/', $phone);
    }

    public
    function validateRequestsData(array $needle, ?array $hayStack = null): bool
    {
        if (empty($hayStack)) {
            $hayStack = array_keys($_POST ?? []);
        }

        foreach ($needle as $item) {
            if (!in_array($item, $hayStack)) {
                $output = false;
            }
        }

        return $output ?? true;
    }

    public
    function nationalCodeValidate($code): bool
    {
        if (!preg_match('/^[0-9]{10}$/', $code)) {
            return false;
        }

        for ($i = 0; $i < 10; $i++)
            if (preg_match('/^' . $i . '{10}$/', $code)) {
                return false;
            }

        for ($i = 0, $sum = 0; $i < 9; $i++)
            $sum += ((10 - $i) * intval(substr($code, $i, 1)));
        $ret = $sum % 11;
        $parity = intval(substr($code, 9, 1));
        if (($ret < 2 && $ret == $parity) || ($ret >= 2 && $ret == 11 - $parity)) {
            return true;
        }

        return false;
    }
}