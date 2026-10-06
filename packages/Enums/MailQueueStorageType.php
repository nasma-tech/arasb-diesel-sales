<?php

namespace Packages\Enums;

enum MailQueueStorageType: string
{
    case mongodb = 'mongodb';
    case mysql = 'mysql';
}
