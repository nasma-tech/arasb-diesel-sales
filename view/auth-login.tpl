<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>{$pageTitle} - ERP </title>
    <link rel="icon" type="image/x-icon" href="/public/images/ico/favicon.ico">
    <meta name="theme-color" content="#5A8DEE">
    <link rel="stylesheet" type="text/css" href="/public/vendors/css/vendors.min.css">
    <link rel="stylesheet" type="text/css" href="/public/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/public/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="/public/css/colors.css">
    <link rel="stylesheet" type="text/css" href="/public/css/components.css">
    <link rel="stylesheet" type="text/css" href="/public/css/themes/semi-dark-layout.css">
    <link rel="stylesheet" type="text/css"
          href="/public/css/core/menu/menu-types/vertical-menu.css">
    <link rel="stylesheet" type="text/css" href="/public/css/pages/authentication.css">

    <link rel="stylesheet" type="text/css"
          href="/public/vendors/css/extensions/swiper.min.css">
    <link rel="stylesheet" type="text/css" href="/public/css/plugins/extensions/swiper.css">
    <link rel="stylesheet" type="text/css" href="/public/vendors/css/extensions/toastr.css">
    <link rel="stylesheet" type="text/css" href="/public/css/quick.css">
    <link rel="stylesheet" href="/public/css/login.css">


    {if isset($xheader)}
        {$xheader}
    {/if}
</head>
<body class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 1-column  navbar-sticky footer-static blank-page blank-page"
      data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
<input type="hidden" id="_url" value="{APP_URL}">
<svg xmlns="http://www.w3.org/2000/svg" style="display: none">

    <symbol id="svg-user" viewBox="0 0 32 32" fill="none">
        <path d="M28 32.0008H25.3333V25.2768C25.3323 24.2315 24.9165 23.2293 24.1774 22.4901C23.4382 21.7509 22.436 21.3352 21.3907 21.3341H10.6093C9.564 21.3352 8.56178 21.7509 7.82262 22.4901C7.08345 23.2293 6.66773 24.2315 6.66667 25.2768V32.0008H4V25.2768C4.00212 23.5246 4.69914 21.8447 5.93817 20.6056C7.1772 19.3666 8.85708 18.6696 10.6093 18.6675H21.3907C23.1429 18.6696 24.8228 19.3666 26.0618 20.6056C27.3009 21.8447 27.9979 23.5246 28 25.2768V32.0008Z"
              fill="currentColor"/>
        <path d="M16 16C14.4178 16 12.871 15.5308 11.5554 14.6518C10.2398 13.7727 9.21447 12.5233 8.60897 11.0615C8.00347 9.59966 7.84504 7.99113 8.15372 6.43928C8.4624 4.88743 9.22433 3.46197 10.3431 2.34315C11.462 1.22433 12.8874 0.462403 14.4393 0.153721C15.9911 -0.15496 17.5997 0.00346629 19.0615 0.608967C20.5233 1.21447 21.7727 2.23985 22.6518 3.55544C23.5308 4.87104 24 6.41775 24 8C23.9979 10.1211 23.1544 12.1547 21.6545 13.6545C20.1547 15.1544 18.1211 15.9979 16 16ZM16 2.66667C14.9452 2.66667 13.914 2.97947 13.037 3.5655C12.1599 4.15153 11.4763 4.98449 11.0726 5.95903C10.669 6.93357 10.5634 8.00592 10.7691 9.04049C10.9749 10.0751 11.4829 11.0254 12.2288 11.7712C12.9746 12.5171 13.925 13.0251 14.9595 13.2309C15.9941 13.4366 17.0664 13.331 18.041 12.9274C19.0155 12.5237 19.8485 11.8401 20.4345 10.963C21.0205 10.086 21.3333 9.05484 21.3333 8C21.3333 6.58552 20.7714 5.22896 19.7712 4.22877C18.771 3.22857 17.4145 2.66667 16 2.66667Z"
              fill="currentColor"/>
    </symbol>

    <symbol id="svg-locked" viewBox="0 0 32 32" fill="none">
        <path d="M25.3337 10.6667V9.33333C25.3337 6.85798 24.3503 4.48401 22.6 2.73367C20.8496 0.983331 18.4757 0 16.0003 0C13.525 0 11.151 0.983331 9.40066 2.73367C7.65032 4.48401 6.66699 6.85798 6.66699 9.33333V10.6667H2.66699V28C2.66699 29.0609 3.08842 30.0783 3.83857 30.8284C4.58871 31.5786 5.60613 32 6.66699 32H25.3337C26.3945 32 27.4119 31.5786 28.1621 30.8284C28.9122 30.0783 29.3337 29.0609 29.3337 28V10.6667H25.3337ZM9.33366 9.33333C9.33366 7.56522 10.036 5.86953 11.2863 4.61929C12.5365 3.36905 14.2322 2.66667 16.0003 2.66667C17.7684 2.66667 19.4641 3.36905 20.7144 4.61929C21.9646 5.86953 22.667 7.56522 22.667 9.33333V10.6667H9.33366V9.33333ZM26.667 28C26.667 28.3536 26.5265 28.6928 26.2765 28.9428C26.0264 29.1929 25.6873 29.3333 25.3337 29.3333H6.66699C6.31337 29.3333 5.97423 29.1929 5.72418 28.9428C5.47413 28.6928 5.33366 28.3536 5.33366 28V13.3333H26.667V28Z"
              fill="currentColor"/>
        <path d="M17.3337 18.666H14.667V23.9993H17.3337V18.666Z" fill="currentColor"/>
    </symbol>

    <symbol id="svg-arrow-left" viewBox="0 0 48 48" fill="none">
        <path d="M27.5398 40.5399L12.9998 25.9998C11.4598 24.4598 11.4597 24.5398 12.9997 22.9998L27.5398 8.85986"
              stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>

</svg>
<main class="login-layout">
    <div class="container l-container transition-1000">
        <div class="column-1 flex justify-center">
            <div class="logo-container transition-1000">
                <img src="/public/images/logo/logo-login-main.png" alt="logo">
            </div>
        </div>

        <section id="auth-login">
            <div class="column-2 transition-1000">
                <h1 class="title font-bold">ورود کاربران</h1>
                <p class="description font-normal">لطفا مشخصات کاربری خود را وارد نمائید.</p>
                <form id="mainLogin" class="l-form">
                    <div>
                        <label class="sr-only" for="userName">نام کاربری</label>
                        <!-- add "has-error" class to input-parent to see message -->
                        <div class="input-parent flex flex-col">
                            <div class="input-row flex">
                                <div class="icon-box flex items-center justify-center">
                                    <svg>
                                        <use href="#svg-user"/>
                                    </svg>
                                </div>
                                <div class="input-box">
                                    <input type="text" name="user_name" required id="userName" class="input"
                                           placeholder="نام کاربری" aria-describedby="username-error"/>
                                </div>
                            </div>
                            <span class="message font-normal" role="alert"
                                  id="username-error">نام کاربری اشتباه است</span>
                        </div>
                    </div>

                    <div class="flex items-center password-submit">
                        <label class="sr-only" for="userPassword">رمز عبور</label>
                        <!-- add "has-error" class to input-parent to see message -->
                        <div class="input-parent flex flex-col">
                            <div class="input-row flex">
                                <div class="icon-box flex items-center justify-center">
                                    <svg>
                                        <use href="#svg-locked"/>
                                    </svg>
                                </div>
                                <div class="input-box">
                                    <input type="password" name="user_password" required id="userPassword"
                                           class="input"
                                           placeholder="رمز عبور" aria-describedby="password-error"/>
                                </div>
                            </div>
                            <span class="message font-normal" role="alert"
                                  id="password-error">رمز عبور اشتباه است</span>
                        </div>

                        <button type="button" role="button" aria-label="ورود"
                                class="l-submit flex items-center justify-center" id="submitLogin">
                            <svg>
                                <use href="#svg-arrow-left"/>
                            </svg>
                        </button>

                    </div>
                </form>
            </div>
        </section>
    </div>
    <footer class="l-footer transition-1000">
        <div class="container flex items-center justify-end h-full">
            <a href="#" title="" class="home-link flex">
                <img style="height: 100%" src="/public/images/logo/logo-login-footer.png" alt="logo">
            </a>
        </div>
    </footer>
</main>
<script>
    {literal}
    document.addEventListener('DOMContentLoaded', function () {

        const loginLayoutPage = document.querySelector(".login-layout");
        if (!loginLayoutPage) return;

        const transitions = [
            {className: "transition-step-one", delay: 1000},
            {className: "transition-step-two", delay: 2500},
            {className: "transition-step-three", delay: 3750}
        ];


        transitions.forEach(({className, delay}) => {
            setTimeout(() => loginLayoutPage.classList.add(className), delay);
        });

    })
    {/literal}

</script>

<script src="/public/vendors/js/vendors.min.js"></script>
<script src="/public/fonts/LivIconsEvo/js/LivIconsEvo.tools.min.js"></script>
<script src="/public/fonts/LivIconsEvo/js/LivIconsEvo.defaults.js"></script>
<script src="/public/fonts/LivIconsEvo/js/LivIconsEvo.min.js"></script>
<script src="/public/js/core/app-menu.js"></script>
<script src="/public/js/core/app.js"></script>
<script src="/public/js/scripts/components.js"></script>
<script src="/public/js/scripts/footer.js"></script>
<script src="/public/vendors/js/extensions/swiper.min.js"></script>
<script src="/public/js/scripts/extensions/swiper.js"></script>
<script src="/public/vendors/js/extensions/toastr.min.js"></script>
<script src="/public/vendors/js/sweetalert2/sweetalert2@11.js"></script>
<script src="/public/js/login/login.js"></script>

{if isset($xfooter)}
    {$xfooter}
{/if}
</body>
</html>