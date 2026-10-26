{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title">{$singleName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshAndBackButton()}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 3px">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-content">
                        <div class="card-body">

                            <ul class="nav nav-pills nav-justified cc-modern-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active"
                                       id="contact-tab-justified"
                                       data-toggle="pill"
                                       href="#contact-justified"
                                       aria-expanded="true">
                                        اطلاعات مخاطب
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link"
                                       id="followUpHistory-tab-justified"
                                       data-toggle="pill"
                                       href="#followUpHistory-justified"
                                       aria-expanded="false">
                                        تاریخچه پیگیری‌ها
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="tab-content" style="margin-top: 3px">
                    <div role="tabpanel" class="tab-pane active" id="contact-justified"
                         aria-labelledby="contact-tab-justified" aria-expanded="true">
                        <form action="/CustomerContactInformation/add" method="post">
                            <div class="row">
                                {include 'CustomerContactInformation/ContactInfo.tpl'}
                                {include 'CustomerContactInformation/ContactPhones.tpl'}
                                {include 'CustomerContactInformation/ContactProject.tpl'}
                                {include 'CustomerContactInformation/ContactProjectFollowUp.tpl'}
                                <div class="col-md-12">
                                    <div class="card shadow mt-1 mb-5">
                                        <div class="card-content">
                                            <div class="card-body pb-3">
                                                <button class="btn btn-sm btn-primary float-right">ثبت
                                                    مرکز تماس
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="followUpHistory-justified" role="tabpanel"
                         aria-labelledby="followUpHistory-tab-justified" aria-expanded="false">
                        <div class="stats">
                            <div class="stat-card shadow">
                                <div>
                                    <div class="stat-label">پیگیری‌های امروز</div>
                                    <div class="stat-number">{$toDayFollowUpCount|default:0}</div>
                                    <div class="stat-description">برای انجام در امروز</div>
                                </div>
                                <div class="stat-icon icon-blue">
                                    <i class="bx bx-calendar-event"></i>
                                </div>
                            </div>
                            <div class="stat-card shadow">
                                <div>
                                    <div class="stat-label">عقب‌افتاده</div>
                                    <div class="stat-number">{$pastFollowUpCount|default:0}</div>
                                    <div class="stat-description">نیازمند رسیدگی فوری</div>
                                </div>
                                <div class="stat-icon icon-red">
                                    <i class="bx bx-alarm-add"></i>
                                </div>
                            </div>
                            <div class="stat-card shadow">
                                <div>
                                    <div class="stat-label">انجام‌شده امروز</div>
                                    <div class="stat-number">{$toDayFollowUpActionCount|default:0}</div>
                                    <div class="stat-description">از ۱۲ پیگیری امروز</div>
                                </div>
                                <div class="stat-icon icon-green">
                                    <i class="bx bx-check-circle"></i>
                                </div>
                            </div>
                            <div class="stat-card shadow">
                                <div>
                                    <div class="stat-label">پیگیری‌های آینده</div>
                                    <div class="stat-number">{$nextFollowUpCount|default:0}</div>
                                    <div class="stat-description">برنامه‌ریزی‌شده</div>
                                </div>
                                <div class="stat-icon icon-orange">
                                    <i class="bx bx-calendar"></i>
                                </div>
                            </div>
                        </div>


                        <div class="card shadow">
                            <div class="card-content">
                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}
