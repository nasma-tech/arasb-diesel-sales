<?php

namespace Packages\Support\Number;

class NumberNormalizer
{
    public
    function removePriceSeparator($value, $target = [',', ' ']): array|string
    {
        return str_replace($target, "", $value);
    }


    function numberFormat($number, $separator = ','): array|string|null
    {
        $number = (string)$number;

        $negative = false;
        if (str_starts_with($number, '-')) {
            $negative = true;
            $number = substr($number, 1);
        }

        $parts = explode('.', $number);
        $integerPart = $parts[0];
        $decimalPart = $parts[1] ?? '';

        $integerPart = preg_replace('/\B(?=(\d{3})+(?!\d))/', $separator, $integerPart);

        $formatted = $integerPart;
        if ($decimalPart !== '') {
            $formatted .= '.' . $decimalPart;
        }

        return (($negative) ? '-' . $formatted : $formatted);
    }


    public function floatNumberFormat($number, $decPoint = '.', $thousandsSep = ','): string
    {
        $number = (string)$number;

        // چک منفی بودن
        $isNegative = false;
        if (str_starts_with($number, '-')) {
            $isNegative = true;
            $number = substr($number, 1);
        }

        $parts = explode('.', $number);

        $integerPart = $parts[0];
        $decimalPart = $parts[1] ?? null;

        $integerPart = number_format((int)$integerPart, 0, '', $thousandsSep);

        $result = $integerPart;

        if ($decimalPart !== null) {
            $result .= $decPoint . $decimalPart;
        }

        if ($isNegative) {
            $result = '-' . $result;
        }

        return $result;
    }


}