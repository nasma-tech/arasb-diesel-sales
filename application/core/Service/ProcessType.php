<?php

namespace App\core\Service;

enum ProcessType: int
{
    case Finish = 1;
    case Cancel = 2;
    case Resend = 3;
}