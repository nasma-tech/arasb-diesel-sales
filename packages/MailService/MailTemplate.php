<?php

namespace Packages\MailService;

class MailTemplate
{
    public
    function mailTemplate($title = '', $body = []): string
    {
        $output = '<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>' . $title . '</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
@media only screen and (max-width:600px) {

    table[class="container"] {
        width: 100% !important;
    }

    td[class="padding"] {
        padding: 15px !important;
    }

    td[class="stack"] {
        display: block !important;
        width: 100% !important;
        text-align: right !important;
        box-sizing: border-box;
    }

    h1 {
        font-size: 18px !important;
    }

    th, td {
        font-size: 13px !important;
    }
}
</style>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;direction:rtl;
font-family:Tahoma,Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" dir="rtl"
       style="background-color:#f4f6f8;padding:20px 0;">
<tr>
<td align="center">

<!-- CONTAINER -->
<table class="container" width="100%" cellpadding="0" cellspacing="0"
       style="max-width:700px;background-color:#ffffff;
       border-radius:10px;overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background-color:#0b1c2d;padding:20px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:normal;">
' . $title . '
</h1>
</td>
</tr>

<!-- INFO -->
<tr>
<td class="padding" style="padding:25px;">
<table width="100%" cellpadding="6" cellspacing="0"
       style="font-size:14px;color:#333333;">';
        foreach ($body as $key => $item) {
            $output .= '<tr>
                        <td class="stack"><strong>' . $key . ':</strong></td>
                        <td class="stack">' . $item . '</td>
                        </tr>';
        }
        $output .= '</table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>
';
        return $output;
    }

}