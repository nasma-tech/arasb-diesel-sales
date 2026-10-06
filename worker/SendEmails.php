<?php

use Packages\Database\Mongo\MongoDB;
use Packages\Enums\MailQueueStorageType;
use Packages\MailService\MailSender;

require dirname(__DIR__) . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

require __DIR__ . '/../packages/Database/Eloquent.php';

$mongo = new MongoDB($_ENV['MONGODB_DATABASE']);

$getFromMysql = \App\Models\MailboxQueueModel\MailboxQueueModel::query()
    ->where([
        'status' => 0
    ])
    ->limit(5)
    ->get();

$getFromMongo = $mongo->find(
    'MailboxQueue',
    [
        'status' => 0
    ],
    [
        'limit' => 5
    ]
);
$mailer = new MailSender();

foreach ($getFromMysql as $item) {
    send(
        MailQueueStorageType::mysql,
        $mailer,
        $item
    );
}

foreach ($getFromMongo as $item) {
    send(
        MailQueueStorageType::mongodb,
        $mailer,
        $item,
        $mongo
    );
}

function send(
    MailQueueStorageType $storageType,
    MailSender           $mailSender,
                         $item,
    ?MongoDB             $mongo = null
): void
{
    switch ($storageType->value) {

        case 'mysql':

            $decode = json_decode($item->status_log, true) ?: [];

            $decode[strtotime('today')][] = [
                'status' => 1,
                'datetime' => time(),
                'errorCode' => '',
                'errorDescription' => ''
            ];

            $modify = $item->update([
                'status' => 1,
                'status_log' => json_encode(
                    $decode,
                    JSON_UNESCAPED_UNICODE
                )
            ]);

            if (!$modify) {
                break;
            }

            $send = $mailSender->sendEmail(
                $item->mail_subject,
                $item->mail_receiver_address,
                $item->mail_body,
                json_decode($item->mail_cc_address_data, true)
            );

            if ($send['status']) {

                $decode[strtotime('today')][] = [
                    'status' => 2,
                    'datetime' => time(),
                    'errorCode' => '',
                    'errorDescription' => ''
                ];

                $item->update([
                    'status' => 2,
                    'status_log' => json_encode(
                        $decode,
                        JSON_UNESCAPED_UNICODE
                    )
                ]);

            } else {

                $decode[strtotime('today')][] = [
                    'status' => 3,
                    'datetime' => time(),
                    'errorCode' => $send['errorCode'],
                    'errorDescription' => $send['errorMessage']
                ];

                $item->update([
                    'status' => 3,
                    'status_log' => json_encode(
                        $decode,
                        JSON_UNESCAPED_UNICODE
                    )
                ]);
            }

            break;


        case 'mongodb':

            if (!$mongo) {
                throw new RuntimeException(
                    'MongoDB instance is required.'
                );
            }

            $statusLog = $item->status_log ?? [];

            if ($statusLog instanceof \stdClass) {
                $decode = (array)$statusLog;
            } elseif (is_array($statusLog)) {
                $decode = $statusLog;
            } elseif (is_string($statusLog)) {
                $decode = json_decode($statusLog, true) ?: [];
            } else {
                $decode = [];
            }

            $decode[strtotime('today')][] = [
                'status' => 1,
                'datetime' => time(),
                'errorCode' => '',
                'errorDescription' => ''
            ];

            $modify = $mongo->update(
                'MailboxQueue',
                [
                    '_id' => $item->_id
                ],
                [
                    'status' => 1,
                    'status_log' => json_encode(
                        $decode,
                        JSON_UNESCAPED_UNICODE
                    )
                ]
            );

            if (!$modify) {
                break;
            }

            $cc = $item->mail_cc_address_data ?? [];

            if (is_string($cc)) {
                $cc = json_decode($cc, true) ?: [];
            } elseif (is_object($cc)) {
                $cc = json_decode(json_encode($cc), true) ?: [];
            } elseif (!is_array($cc)) {
                $cc = [];
            }

            $send = $mailSender->sendEmail(
                $item->mail_subject,
                $item->mail_receiver_address,
                $item->mail_body,
                $cc
            );

            if ($send['status']) {

                $decode[strtotime('today')][] = [
                    'status' => 2,
                    'datetime' => time(),
                    'errorCode' => '',
                    'errorDescription' => ''
                ];

                $mongo->update(
                    'MailboxQueue',
                    [
                        '_id' => $item->_id
                    ],
                    [
                        'status' => 2,
                        'status_log' => json_encode(
                            $decode,
                            JSON_UNESCAPED_UNICODE
                        )
                    ]
                );

            } else {

                $decode[strtotime('today')][] = [
                    'status' => 3,
                    'datetime' => time(),
                    'errorCode' => $send['errorCode'],
                    'errorDescription' => $send['errorMessage']
                ];

                $mongo->update(
                    'MailboxQueue',
                    [
                        '_id' => $item->_id
                    ],
                    [
                        'status' => 3,
                        'status_log' => json_encode(
                            $decode,
                            JSON_UNESCAPED_UNICODE
                        )
                    ]
                );
            }

            break;
    }
}