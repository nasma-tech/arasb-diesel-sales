<?php

namespace Packages\View;

use Packages\Helpers\ButtonHelper;
use Packages\Helpers\DateTimeHelper;
use Packages\Helpers\UserHelper;
use Packages\Security\Csrf;
use Packages\View\Helpers\FlashMessageHelper;
use Smarty;

class View
{
    private $pageTitle;
    private $singleName;
    private $pluralName;
    private $Model;

    public function ui($xfooter = '', $xheader = '', array $vars = []): Smarty
    {
        $ui = new Smarty();
        $ui->setTemplateDir('view');
        $ui->setCompileDir('compiled/');
        $ui->setConfigDir('ui/conf/');
        $ui->setCacheDir('ui/cache/');
        $ui->assign('app_url', APP_URL . '/');
        $ui->assign('_theme', APP_URL . '/public');
        $ui->assign('pageTitle', $this->getPageTitle());
        $ui->assign('singleName', $this->getSingleName());
        $ui->assign('pluralName', $this->getPluralName());
        $ui->assign('getData', $this->getModel());
        $ui->assign('buttonHelper', new ButtonHelper());
        $ui->assign('dateTimeHelper', new DateTimeHelper());
        $ui->assign('csrf', new Csrf());
        $ui->assign('userHelper', new UserHelper());
        $ui->assign('flashMessageHelper', new FlashMessageHelper());
        $ui->caching = Smarty::CACHING_OFF;
        $ui->compile_check = true;
        $ui->force_compile = true;
        $ui->cache_lifetime = 0;

        foreach ($vars as $key => $item) {
            $ui->assign("$key", $item);
        }

        //Assign JS
        $js = $this->readJs($xfooter);
        $ui->assign('xfooter', $js);
        //Assign CSS
        $css = $this->readCss($xheader);
        $ui->assign('xheader', $css);
        //Make Menu
        $ui->assign('menu', new \Packages\View\Menu());

        return $ui;
    }


    public function readCss($path): string
    {
        $gen = '';
        if ($path) {
            if (is_array($path)) {
                foreach ($path as $p) {
                    $gen .= '<link rel="stylesheet" type="text/css" href="/public/' . $p . '.css"/>';
                }
            } else {
                $gen = '<link rel="stylesheet" type="text/css" href="/public/' . $path . '.css"/>';
            }
        }
        return $gen;
    }

    public function readJs($path): string
    {
        $gen = '';
        if ($path) {
            if (is_array($path)) {
                foreach ($path as $p) {
                    $gen .= '<script type="text/javascript" src="/public/' . $p . '.js?v=' . time() . '"></script>';
                }
            } else {
                $gen = '<script type="text/javascript" src="/public/' . $path . '.js?v=' . time() . '"></script>';
            }
        }
        return $gen;
    }


    /**
     * @param mixed $pageTitle
     */
    public function setPageTitle(mixed $pageTitle): void
    {
        $this->pageTitle = $pageTitle;
    }

    /**
     * @return mixed
     */
    private function getPageTitle(): mixed
    {
        return $this->pageTitle;
    }

    /**
     * @param mixed $singleName
     */
    public function setSingleName(mixed $singleName): void
    {
        $this->singleName = $singleName;
    }


    /**
     * @return mixed
     */

    private function getSingleName(): mixed
    {
        return $this->singleName;
    }

    /**
     * @param mixed $pluralName
     */
    public function setPluralName(mixed $pluralName): void
    {
        $this->pluralName = $pluralName;
    }

    /**
     * @return mixed
     */
    private function getPluralName(): mixed
    {
        return $this->pluralName;
    }

    /**
     * @param mixed $Model
     */
    public function setModel(mixed $Model): void
    {
        $get = $Model;

        if ($get) {
            $this->Model = $get;
        } else {
            header('location:/notAccess');
        }
    }

    /**
     * @return mixed
     */
    public function getModel(): mixed
    {
        return $this->Model;
    }

    public function debug(bool $debug = false, array $users = [], array $ips = [], $title = 'در حال بروزرسانی', $description = 'این صفحه در دست بروزرسانی هستش...'): void
    {
        $userLogin = userObject()->userId;
        $userIp = $_SERVER['REMOTE_ADDR'];
        if ($debug && !in_array($userLogin, $users) && !in_array($userIp, $ips)) {
            $view = new View();
            $view->ui('', '', [
                'getMsg' => $this->show404Error(),
                'title' => $title,
                'description' => $description
            ])->display('sections/develop.tpl');
            die();
        }
    }

    public function show404Error(): string
    {
        return '<div class="app-content content bg-light">
                    <div class="content-wrapper">
                        <div class="content-body">
                            <div class="card bg-transparent shadow-none">
                                <div class="card-content text-center">
                                    <div class="card-body text-center bg-transparent miscellaneous">
                                        <h1 class="error-title">صفحه یافت نشد :(</h1>
                                        <p class="pb-3 text-white">صفحه ای که به دنبال آن هستید موجود نیست</p>
                                        <img class="img-fluid" src="' . APP_URL . '/public/images/pages/404.png" alt="404 error">
                                    </div>
                                    <button class="btn btn-sm btn-primary mt-2">رفتن به داشبورد</button>
                                </div>
                            </div>
                         </div>
                        </div>
                    </div>';
    }

    public function showNotAccessPage(): string
    {
        return '
        <div class="app-content content bg-light">
            <div class="content-wrapper">
                 <div class="content-body">
                    <div class="card bg-transparent shadow-none">
                        <div class="card-content">
                            <div class="card-body text-center bg-transparent miscellaneous">
                              <img src="/public/images/pages/not-authorized.png" class="img-fluid" alt="not authorized" width="400">
                              <h1 class="my-2 error-title">شما مجاز به دسترسی نیستید!</h1>
                              <p class="text-white">
                                  شما مجوز لارم برای مشاهده این دایرکتوری یا صفحه را ندارید.
                              </p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        ';
    }

}