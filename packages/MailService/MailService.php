<?php

namespace Packages\MailService;

use App\Models\MailboxQueueModel\MailboxQueueModel;
use InvalidArgumentException;
use MongoDB\BSON\UTCDateTime;
use Packages\Database\Mongo\MongoDB;
use Packages\Enums\MailQueueStorageType;
use RuntimeException;

class MailService
{
    public function addMailToQueue(
        string               $mailSubject,
        string               $mailReceiverAddress,
        string               $mailBody,
        array                $mailCcAddressData = [],
        array                $mailAttachment = [],
        MailQueueStorageType $storage = MailQueueStorageType::mongodb,
    ): bool
    {
        $directory = __SOURCE__ . 'Storage/cache/MailboxQueueCash';
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }
        foreach ($mailAttachment as &$item) {
            if ($item['type'] !== 'stringify') {
                continue;
            }
            $filePath = $directory . '/' . date('Ymd_His_') . uniqid('', true) . '.txt';
            if (file_put_contents($filePath, $item['content']) === false) {
                throw new RuntimeException("Unable to create temp file: {$filePath}");
            }
            $item['tempPath'] = $filePath;
            unset($item['content']);
        }
        $data = [
            "mail_subject" => trim($mailSubject),
            "mail_receiver_address" => trim($mailReceiverAddress),
            "mail_cc_address_data" => $mailCcAddressData,
            "mail_body" => trim($mailBody),
            "mail_attachment" => $mailAttachment,
            "status" => 0,
            "status_log" => [
                strtotime("today") => [
                    [
                        "datetime" => time(),
                        "status" => 0,
                        "errorCode" => '',
                        "errorDescription" => ''
                    ]
                ]
            ],
        ];
        /* * MySQL */
        if ($storage->value === 'mysql') {
            MailboxQueueModel::query()->create([
                "mail_subject" => $data["mail_subject"],
                "mail_receiver_address" => $data["mail_receiver_address"],
                "mail_cc_address_data" => json_encode($data["mail_cc_address_data"], JSON_UNESCAPED_UNICODE),
                "mail_body" => $data["mail_body"],
                "mail_attachment" => json_encode($data["mail_attachment"], JSON_UNESCAPED_UNICODE), "status" => $data["status"],
                "status_log" => json_encode($data["status_log"], JSON_UNESCAPED_UNICODE),
            ]);
        }
        /* * MongoDB */
        if ($storage->value === 'mongodb') {
            $mongo = new MongoDB($_ENV['MONGODB_DATABASE']);

            $id = $mongo->insert('MailboxQueue', [
                'mail_subject' => $data['mail_subject'],
                'mail_receiver_address' => $data['mail_receiver_address'],
                'mail_cc_address_data' => $data['mail_cc_address_data'],
                'mail_body' => $data['mail_body'],
                'mail_attachment' => $data['mail_attachment'],
                'status' => $data['status'],
                'status_log' => $data['status_log'],
                'created_at' => new UTCDateTime(),
                'deleted_at' => null,
            ]);

            return !empty($id);
        }
        throw new InvalidArgumentException("Unsupported mail queue storage: {$storage}");
    }

}
