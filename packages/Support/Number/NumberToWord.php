<?php

declare(strict_types=1);

namespace Packages\Support\Number;

/**
 * Converts integer values into their Persian (Farsi) word representation.
 *
 * The converter processes numbers in three-digit groups and combines them
 * using Persian scale names such as thousand, million, billion, trillion,
 * and higher magnitudes.
 *
 * Examples:
 *
 * 0
 * => صفر
 *
 * 125
 * => صد و بیست و پنج
 *
 * 1,254,300
 * => یک میلیون و دویست و پنجاه و چهار هزار و سیصد
 *
 * -1500
 * => منفی یک هزار و پانصد
 *
 * Persian and Arabic digits are also supported:
 *
 * ۱۲۳۴
 * => یک هزار و دویست و سی و چهار
 *
 * This class works with numeric strings internally to avoid integer overflow
 * when converting very large numbers.
 */
class NumberToWord
{
    /**
     * Words for single-digit numbers.
     */
    private const array ONES = [
        1 => 'یک',
        2 => 'دو',
        3 => 'سه',
        4 => 'چهار',
        5 => 'پنج',
        6 => 'شش',
        7 => 'هفت',
        8 => 'هشت',
        9 => 'نه',
    ];

    /**
     * Words for numbers between 10 and 19.
     */
    private const array TEENS = [
        10 => 'ده',
        11 => 'یازده',
        12 => 'دوازده',
        13 => 'سیزده',
        14 => 'چهارده',
        15 => 'پانزده',
        16 => 'شانزده',
        17 => 'هفده',
        18 => 'هجده',
        19 => 'نوزده',
    ];

    /**
     * Words for multiples of ten.
     */
    private const array TENS = [
        2 => 'بیست',
        3 => 'سی',
        4 => 'چهل',
        5 => 'پنجاه',
        6 => 'شصت',
        7 => 'هفتاد',
        8 => 'هشتاد',
        9 => 'نود',
    ];

    /**
     * Words for multiples of one hundred.
     */
    private const array HUNDREDS = [
        1 => 'صد',
        2 => 'دویست',
        3 => 'سیصد',
        4 => 'چهارصد',
        5 => 'پانصد',
        6 => 'ششصد',
        7 => 'هفتصد',
        8 => 'هشتصد',
        9 => 'نهصد',
    ];

    /**
     * Scale names for three-digit groups.
     *
     * Index 0 represents the base group and therefore has no scale name.
     */
    private const array SCALES = [
        0  => '',
        1  => 'هزار',
        2  => 'میلیون',
        3  => 'میلیارد',
        4  => 'تریلیون',
        5  => 'کادریلیون',
        6  => 'کوینتریلیون',
        7  => 'سکستریلیون',
        8  => 'سپتریلیون',
        9  => 'اکتریلیون',
        10 => 'نونیلیون',
        11 => 'دسیلیون',
    ];

    /**
     * Separator used between Persian number segments.
     */
    private const string AND_SEPARATOR = ' و ';

    /**
     * Convert an integer value into Persian words.
     *
     * Both integers and numeric strings are accepted. Thousands separators,
     * spaces, Persian digits, Arabic digits and negative numbers are supported.
     *
     * @param int|string $number Number to convert.
     *
     * @return string Persian word representation of the number.
     *
     * @throws \InvalidArgumentException If the provided value is not a valid integer.
     * @throws \OutOfRangeException If the number exceeds the supported scales.
     */
    public function numberToWords(int|string $number): string
    {
        $number = $this->normalizeNumber($number);

        if ($number === '0') {
            return 'صفر';
        }

        $isNegative = str_starts_with($number, '-');

        if ($isNegative) {
            $number = substr($number, 1);
        }

        $groups = $this->splitIntoGroups($number);

        if (count($groups) > count(self::SCALES)) {
            throw new \OutOfRangeException(
                'The provided number exceeds the maximum supported scale.'
            );
        }

        $parts = [];
        $totalGroups = count($groups);

        foreach ($groups as $index => $group) {
            $groupValue = (int) $group;

            if ($groupValue === 0) {
                continue;
            }

            $words = $this->groupToWords($groupValue);

            $scaleIndex = $totalGroups - $index - 1;

            if ($scaleIndex > 0) {
                $words .= ' ' . self::SCALES[$scaleIndex];
            }

            $parts[] = $words;
        }

        $result = implode(self::AND_SEPARATOR, $parts);

        return $isNegative
            ? 'منفی ' . $result
            : $result;
    }

    /**
     * Convert a value between 1 and 999 into Persian words.
     *
     * @param int $group Three-digit numeric group.
     *
     * @return string Persian word representation.
     */
    private function groupToWords(int $group): string
    {
        $parts = [];

        $hundreds = intdiv($group, 100);
        $remainder = $group % 100;

        if ($hundreds > 0) {
            $parts[] = self::HUNDREDS[$hundreds];
        }

        if ($remainder >= 10 && $remainder <= 19) {
            $parts[] = self::TEENS[$remainder];

            return implode(self::AND_SEPARATOR, $parts);
        }

        $tens = intdiv($remainder, 10);
        $ones = $remainder % 10;

        if ($tens > 0) {
            $parts[] = self::TENS[$tens];
        }

        if ($ones > 0) {
            $parts[] = self::ONES[$ones];
        }

        return implode(self::AND_SEPARATOR, $parts);
    }

    /**
     * Split a numeric string into three-digit groups.
     *
     * Example:
     *
     * 123456789
     *
     * becomes:
     *
     * [
     *     '123',
     *     '456',
     *     '789',
     * ]
     *
     * @param string $number Normalized positive numeric string.
     *
     * @return array<int, string>
     */
    private function splitIntoGroups(string $number): array
    {
        $padding = (3 - strlen($number) % 3) % 3;

        if ($padding > 0) {
            $number = str_pad(
                $number,
                strlen($number) + $padding,
                '0',
                STR_PAD_LEFT
            );
        }

        return str_split($number, 3);
    }

    /**
     * Normalize and validate the given number.
     *
     * Supported input formats:
     *
     * - 123456
     * - "123456"
     * - "123,456"
     * - "۱۲۳۴۵۶"
     * - "١٢٣٤٥٦"
     * - "-123456"
     *
     * @param int|string $number
     *
     * @return string Normalized integer string.
     *
     * @throws \InvalidArgumentException
     */
    private function normalizeNumber(int|string $number): string
    {
        $number = (string) $number;

        $number = $this->convertDigitsToEnglish($number);

        $number = str_replace(
            [
                ',',
                '٬',
                ' ',
            ],
            '',
            $number
        );

        $number = trim($number);

        if (!preg_match('/^-?\d+$/', $number)) {
            throw new \InvalidArgumentException(
                'The provided value must be a valid integer.'
            );
        }

        $isNegative = str_starts_with($number, '-');

        $number = ltrim($number, '-');
        $number = ltrim($number, '0');

        if ($number === '') {
            return '0';
        }

        return $isNegative
            ? '-' . $number
            : $number;
    }

    /**
     * Convert Persian and Arabic digits to English digits.
     */
    private function convertDigitsToEnglish(string $value): string
    {
        return strtr($value, [
            // Persian digits
            '۰' => '0',
            '۱' => '1',
            '۲' => '2',
            '۳' => '3',
            '۴' => '4',
            '۵' => '5',
            '۶' => '6',
            '۷' => '7',
            '۸' => '8',
            '۹' => '9',

            // Arabic digits
            '٠' => '0',
            '١' => '1',
            '٢' => '2',
            '٣' => '3',
            '٤' => '4',
            '٥' => '5',
            '٦' => '6',
            '٧' => '7',
            '٨' => '8',
            '٩' => '9',
        ]);
    }
}