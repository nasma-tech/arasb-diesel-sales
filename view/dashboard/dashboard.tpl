{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}
<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4" style="margin-top: 3px">
                    <div class="card shadow h-100">
                        <div class="card-header mx-auto pt-3">
                            <div class="avatar bg-rgba-primary p-50">
                                <img class="img-fluid" src="{$userHelper->getUserImage()}"
                                     alt="img placeholder" height="134" width="134">
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="card-body text-center">
                                <h4>{$user->full_name}</h4>
                                <p>{((isset($smarty.session.roleTitle)) ? $smarty.session.roleTitle : '')}</p>
                                <div class="d-flex justify-content-around mb-1">
                                    <div class="card-icons d-flex flex-column">
                                        <i class="bx bx-camera font-medium-5 font-weight-bold"></i>
                                        <p>0</p>
                                    </div>
                                    <div class="card-icons d-flex flex-column">
                                        <i class="bx bx-heart font-medium-5 font-weight-bold"></i>
                                        <p>0</p>
                                    </div>
                                    <div class="card-icons d-flex flex-column">
                                        <i class="bx bx-user font-medium-5 font-weight-bold"></i>
                                        <p>0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 pl-md-0" style="margin-top: 3px">
                    <div class="card shadow h-100">
                        <div class="card-body">
                            <div class="tab-content text-justify" id="nav-tabContent">
                                <div class="tab-pane line-height-2 show active" id="list-Cartable" role="tabpanel"
                                     aria-labelledby="list-Cartable-list">
                                    <section id="table-cartable">
                                        <ul class="nav nav-tabs" role="tablist">
                                            {foreach $tabData as $tabItem}
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="{$tabItem['englishTitle']}-tab"
                                                       data-toggle="tab"
                                                       href="#{$tabItem['englishTitle']}"
                                                       aria-controls="{$tabItem['englishTitle']}" role="tab"
                                                       aria-selected="true">
                                                        <i class="bx {$tabItem['tabIcon']} align-middle"></i>
                                                        <span class="badge badge-pill badge-danger badge-up countCartable">{count($tabItem['data'])}</span>
                                                        <span class="align-middle">{$tabItem['persianTitle']}</span>
                                                    </a>
                                                </li>
                                            {/foreach}
                                        </ul>
                                        <div class="tab-content">
                                            {foreach $tabData as $tabItem}
                                                <div class="tab-pane {(($tabItem['isActive']) ? 'active' : '')}"
                                                     id="{$tabItem['englishTitle']}"
                                                     aria-labelledby="{$tabItem['englishTitle']}-tab"
                                                     role="tabpanel">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead class="thead-dark">
                                                            <tr>
                                                                {foreach $tabItem['tabHeaders'] as $tabHeader}
                                                                    <th class="text-center border font-small-3">{$tabHeader}</th>
                                                                {/foreach}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {foreach $tabItem['data'] as $cartableItem}
                                                                <tr class="text-center {$labelColorData[$cartableItem['statusData']['code']]}">
                                                                    <td class="border">{$cartableItem['cartableData']['persianTitle']}</td>
                                                                    <td class="border">{$cartableItem['statusData']['title']}</td>
                                                                    <td class="border">{$cartableItem['requesterData']['userFullName']}</td>
                                                                    <td class="border">{$cartableItem['senderData']['userFullName']}</td>
                                                                    <td class="border">{$cartableItem['dateSend']}</td>
                                                                    <td class="border">{$cartableItem['timeSend']}</td>
                                                                    <td class="border">
                                                                        <a class="btn btn-icon rounded-circle btn-primary"
                                                                           href="{$cartableItem['viewAddress']}">
                                                                            <i class="bx bx-show"></i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            {/foreach}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            {/foreach}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="stats" style="margin-top: 14px">
                        <div class="stat-card stat-blue">
                            <div class="stat-info">
                                <div class="stat-label">پیگیری‌های امروز</div>
                                <div class="stat-number">{$toDayFollowUpCount|default:0}</div>
                                <div class="stat-description">
                                    <i class="bx bx-time-five"></i>
                                    برای انجام در امروز
                                </div>
                            </div>
                            <div class="stat-icon icon-blue">
                                <i class="bx bx-calendar-event"></i>
                            </div>
                            <div class="stat-decoration"></div>
                        </div>
                        <div class="stat-card stat-red">
                            <div class="stat-info">
                                <div class="stat-label">عقب‌افتاده</div>
                                <div class="stat-number">{$pastFollowUpCount|default:0}</div>
                                <div class="stat-description">
                                    <i class="bx bx-error-circle"></i>
                                    نیازمند رسیدگی فوری
                                </div>
                            </div>
                            <div class="stat-icon icon-red">
                                <i class="bx bx-time-five"></i>
                            </div>
                            <div class="stat-decoration"></div>
                        </div>
                        <div class="stat-card stat-green">
                            <div class="stat-info">
                                <div class="stat-label">انجام‌شده امروز</div>
                                <div class="stat-number">{$toDayFollowUpActionCount|default:0}</div>
                                <div class="stat-description">
                                    <i class="bx bx-check-circle"></i>
                                    پیگیری‌های تکمیل‌شده
                                </div>
                            </div>
                            <div class="stat-icon icon-green">
                                <i class="bx bx-check-double"></i>
                            </div>
                            <div class="stat-decoration"></div>
                        </div>
                        <div class="stat-card stat-orange">
                            <div class="stat-info">
                                <div class="stat-label">پیگیری‌های آینده</div>
                                <div class="stat-number">{$nextFollowUpCount|default:0}</div>
                                <div class="stat-description">
                                    <i class="bx bx-calendar"></i>
                                    برنامه‌ریزی‌شده
                                </div>
                            </div>
                            <div class="stat-icon icon-orange">
                                <i class="bx bx-calendar-check"></i>
                            </div>
                            <div class="stat-decoration"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row dashboard-panels">

                <!-- مصوبات فعال -->
                <div class="col-md-6 mb-4">
                    <div class="dashboard-panel">
                        <div class="dashboard-panel-header">
                            <div class="panel-title-group">
                                <div class="panel-icon panel-icon-red">
                                    <i class="bx bx-task"></i>
                                </div>
                                <div>
                                    <h5>مصوبات فعال</h5>
                                    <span>مصوبات در انتظار اجرا یا پیگیری</span>
                                </div>
                            </div>

                            <a href="#" class="panel-action">
                                مشاهده همه
                                <i class="bx bx-left-arrow-alt"></i>
                            </a>
                        </div>

                        <div class="dashboard-panel-body">
                            <div class="resolution-item">
                                <div class="resolution-indicator"></div>
                                <div class="resolution-content">
                                    <div class="resolution-title">عنوان مصوبه اول</div>
                                    <div class="resolution-meta">
                                        <span><i class="bx bx-calendar"></i> تاریخ تصویب: ۱۴۰۵/۰۷/۲۰</span>
                                        <span><i class="bx bx-time-five"></i> مهلت اجرا: ۱۴۰۵/۰۸/۰۱</span>
                                    </div>
                                </div>
                                <span class="resolution-status status-pending">در حال پیگیری</span>
                            </div>

                            <div class="resolution-item">
                                <div class="resolution-indicator"></div>
                                <div class="resolution-content">
                                    <div class="resolution-title">عنوان مصوبه دوم</div>
                                    <div class="resolution-meta">
                                        <span><i class="bx bx-calendar"></i> تاریخ تصویب: ۱۴۰۵/۰۷/۲۲</span>
                                        <span><i class="bx bx-time-five"></i> مهلت اجرا: ۱۴۰۵/۰۸/۰۵</span>
                                    </div>
                                </div>
                                <span class="resolution-status status-progress">در حال اجرا</span>
                            </div>

                            <div class="panel-empty-state" style="display: none;">
                                <i class="bx bx-clipboard"></i>
                                <span>مصوبه فعالی برای نمایش وجود ندارد.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- اطلاعات واردشده در سیستم -->
                <div class="col-md-6 mb-4">
                    <div class="dashboard-panel">
                        <div class="dashboard-panel-header">
                            <div class="panel-title-group">
                                <div class="panel-icon panel-icon-blue">
                                    <i class="bx bx-data"></i>
                                </div>
                                <div>
                                    <h5>اطلاعات واردشده در سیستم</h5>
                                    <span>خلاصه اطلاعات ثبت‌شده</span>
                                </div>
                            </div>

                            <a href="#" class="panel-action">
                                گزارش کامل
                                <i class="bx bx-left-arrow-alt"></i>
                            </a>
                        </div>

                        <div class="dashboard-panel-body">
                            <div class="system-info-grid">

                                <div class="system-info-item">
                                    <div class="system-info-icon info-blue">
                                        <i class="bx bx-user"></i>
                                    </div>
                                    <div class="system-info-content">
                                        <span>مشتریان</span>
                                        <strong>{$customerCount|default:0}</strong>
                                    </div>
                                </div>

                                <div class="system-info-item">
                                    <div class="system-info-icon info-purple">
                                        <i class="bx bx-buildings"></i>
                                    </div>
                                    <div class="system-info-content">
                                        <span>شرکت‌ها</span>
                                        <strong>{$companyCount|default:0}</strong>
                                    </div>
                                </div>

                                <div class="system-info-item">
                                    <div class="system-info-icon info-green">
                                        <i class="bx bx-phone-call"></i>
                                    </div>
                                    <div class="system-info-content">
                                        <span>پیگیری‌ها</span>
                                        <strong>{$followUpCount|default:0}</strong>
                                    </div>
                                </div>

                                <div class="system-info-item">
                                    <div class="system-info-icon info-orange">
                                        <i class="bx bx-folder"></i>
                                    </div>
                                    <div class="system-info-content">
                                        <span>پروژه‌ها</span>
                                        <strong>{$projectCount|default:0}</strong>
                                    </div>
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