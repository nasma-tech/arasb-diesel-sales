{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-wrapper">
        <div class="card shadow">
            <div class="card-content">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-sm-3 text-center mb-1 mb-sm-0">
                                    <img src="{$userHelper->getUserImage()}" class="rounded"
                                         alt="group image" height="120" width="120">
                                </div>
                                <div class="col-12 col-sm-9">
                                    <div class="row">
                                        <div class="col-12 text-center text-sm-left">
                                            <h6 class="media-heading mb-0 primary-font">{$userHelper->getUserFullName()}<i
                                                        class="cursor-pointer bx bxs-star text-warning ml-50 align-middle"></i>
                                            </h6>
                                            <small class="text-muted align-top line-height-2">-</small>
                                        </div>
                                        <div class="col-12 text-center text-sm-left">
                                            <div class="mb-1 mt-50 line-height-2">
                                                <span class="mr-1">122 <small>مطالب</small></span>
                                                <span class="mr-1">4.7k <small>دنبال کننده</small></span>
                                                <span class="mr-1">652 <small>دنبال شونده</small></span>
                                            </div>
                                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                                                طراحان
                                                گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون</p>
                                            <div>
                                                <div class="badge badge-light-primary badge-round mr-1 mb-1"
                                                     data-toggle="tooltip" data-placement="bottom" title=""
                                                     data-original-title="with 7% growth @valintini_007 is on top 5k"><i
                                                            class="cursor-pointer bx bx-check-shield"></i>
                                                </div>
                                                <div class="badge badge-light-warning badge-round mr-1 mb-1"
                                                     data-toggle="tooltip" data-placement="bottom" title=""
                                                     data-original-title="last 55% growth @valintini_007 is on weedday">
                                                    <i
                                                            class="cursor-pointer bx bx-badge-check"></i>
                                                </div>
                                                <div class="badge badge-light-success badge-round mb-1"
                                                     data-toggle="tooltip"
                                                     data-placement="bottom" title=""
                                                     data-original-title="got premium profile here"><i
                                                            class="cursor-pointer bx bx-award"></i>
                                                </div>
                                            </div>
                                            <button class="btn btn-sm d-none d-sm-block float-right btn-light-primary">
                                                <i class="cursor-pointer bx bx-edit font-small-3 mr-50"></i><span>ویرایش</span>
                                            </button>
                                            <button class="btn btn-sm d-block d-sm-none btn-block text-center btn-light-primary">
                                                <i class="cursor-pointer bx bx-edit font-small-3 mr-25"></i><span>ویرایش</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card shadow mt-1">
            <div class="card-content">
                <div class="card-body">
                    <h5 class="card-title">اطلاعات کامل</h5>
                    <ul class="list-unstyled line-height-2">
                        <li class="mb-1"><i class="cursor-pointer bx bx-map align-middle mr-50"></i>تهران</li>
                        <li class="mb-1"><i class="cursor-pointer bx bx-phone-call align-middle mr-50"></i><span
                                    class="ltr-text">(+56) 454 45654</span></li>
                        <li class="mb-1"><i class="cursor-pointer bx bx-time align-middle mr-50"></i>10 مهر</li>
                        <li class="mb-1"><i class="cursor-pointer bx bx-envelope align-middle mr-50"></i>Jonnybravo@gmail.com
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-6">
                            <h6 class="mb-0"><small class="text-muted">شماره موبایل</small></h6>
                            <p><span class="ltr-text">(+46) 456 54432</span></p>
                        </div>
                        <div class="col-6">
                            <h6 class="mb-0"><small class="text-muted">شماره تلفن</small></h6>
                            <p><span class="ltr-text">(+46) 454 22432</span></p>
                        </div>
                        <div class="col-6">
                            <h6 class="mb-0"><small class="text-muted">معرفی کننده</small></h6>
                            <p>تونی استارک</p>
                        </div>
                        <div class="col-6">
                            <h6 class="mb-0"><small class="text-muted">مدیر</small></h6>
                            <p>جان اسنو</p>
                        </div>
                        <div class="col-12">
                            <h6 class="mb-0"><small class="text-muted">بیوگرافی</small></h6>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                                است.
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                                تکنولوژی
                                مورد نیاز و کاربردهای</p>
                        </div>
                    </div>
                    <button class="btn btn-sm d-none d-sm-block float-right btn-light-primary mb-2">
                        <i class="cursor-pointer bx bx-edit font-small-3 mr-50"></i><span>ویرایش</span>
                    </button>
                    <button class="btn btn-sm d-block d-sm-none btn-block text-center btn-light-primary">
                        <i class="cursor-pointer bx bx-edit font-small-3 mr-25"></i><span>ویرایش</span></button>
                </div>
            </div>
        </div>
    </div>
</div>

{include 'sections/footer.tpl'}