<?php

namespace App\core\Service;

enum ActionType: int
{
    case Approve = 1;
    case Reject = 2;
    case Resend = 3;
}