<?php

namespace Packages\MailService;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

date_default_timezone_set("Asia/Tehran");

class MailSender
{
    private $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->mailer->isSMTP();
        $this->mailer->Host = $_ENV['MAIL_HOST'];
        $this->mailer->SMTPAuth = true;
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $this->mailer->CharSet = "UTF-8";
        $this->mailer->isHTML(true);
        $this->mailer->Username = $_ENV['MAIL_USERNAME'];
        $this->mailer->Password = $_ENV['MAIL_PASSWORD'];
        $this->mailer->Port = $_ENV['MAIL_PORT'];
    }

    public function sendEmail(
        string $mailSubject,
        string $mailReceiverAddress,
        string $mailBody,
        array  $mailCcAddressData = [],
        array  $fileAddress = []
    ): array
    {
        try {
            $this->mailer->setFrom($_ENV['MAIL_USERNAME'], $_ENV['MAIL_RECEIVER']);
            $this->mailer->addAddress($mailReceiverAddress, $mailReceiverAddress);
            $this->mailer->Subject = $mailSubject;
            $this->mailer->Body = $mailBody;

            foreach ($mailCcAddressData as $mailCcAddressDatum) {
                $this->mailer->addCC($mailCcAddressDatum, $mailCcAddressDatum);
            }

            $this->mailer->AltBody = strip_tags($mailBody);

            return [
                'status' => $this->mailer->send()
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'errorCode' => $e->getCode(),
                'errorMessage' => $e->getMessage(),
            ];
        }
    }
}
