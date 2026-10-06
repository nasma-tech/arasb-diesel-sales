<?php

namespace Packages\View\Helpers;

class FlashMessageHelper
{
    public
    function formCallBack(): string
    {
        if (isset($_COOKIE['successMessage'])) {
            return '
                    <div class="alert alert-success alert-dismissible callBackMessagesCard" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="بستن">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div class="d-flex align-items-center">
                            <i class="bx bx-like"></i>
                            <span>' . $_COOKIE['successMessage'] . '</span>
                        </div>
                    </div>
                ';
        }
        if (isset($_COOKIE['failedMessage'])) {
            return '
                    <div class="alert alert-danger alert-dismissible callBackMessagesCard" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="بستن">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div class="d-flex align-items-center">
                            <i class="bx bx-unlink"></i>
                            <span>' . $_COOKIE['failedMessage'] . '</span>
                        </div>
                    </div>
            ';
        }
        return '';
    }
}