<?php
namespace App\Controllers\login;
class login
{
    public function main(): void
    {
        view->setPageTitle('ورود');
        view->ui([
//            'assets/js/login/login'
        ])->display('auth-login.tpl');
    }
}