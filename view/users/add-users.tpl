{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}
<div class="app-content content">
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="card">
            <div class="card-header">
                <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                {$buttonHelper->refreshAndBackBtn()}
            </div>
            <div class="card-body">
                <form action="/users/add" method="post" enctype="multipart/form-data">
                    {$csrf->csrfTokenInput()}

                    <div class="row">
                        <!-- Profile -->
                        <div class="col-md-3 text-center border-1 personal_img p-1">
                            <img src="/Storage/DefaultImages/gifCamera.png"
                                 class="img-fluid border"
                                 id="avatarImage"
                                 name="avatarImage"
                                 alt="">

                            <div class="mt-3">
                                <a class="btn btn-primary btn-sm w-100 text-white changeAvatar">
                                    افزودن تصویر پرسنلی
                                </a>
                            </div>

                            <input type="file" hidden name="user_img" id="avatarInput">
                        </div>

                        <!-- Form -->
                        <div class="col-md-9">
                            <div class="row">

                                <div class="col-md-3 mt-2">
                                    <label>جنسیت</label>
                                    <select class="select2 form-control" id="user_gender" name="user_gender">
                                        <option selected value="male">آقا</option>
                                        <option value="female">خانم</option>
                                    </select>
                                </div>
                                <div class="col-md-3 mt-2">
                                    <label for="first_name">نام</label>
                                    <input class="form-control" id="first_name" name="first_name" required>
                                </div>
                                <div class="col-md-3 mt-2">
                                    <label for="last_name">نام خانوادگی</label>
                                    <input class="form-control" id="last_name" name="last_name" required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label for="national_code">کدملی</label>
                                    <input class="form-control" id="national_code" name="national_code" required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label>شماره موبایل</label>
                                    <input class="form-control" id="user_mobile" name="user_mobile" required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label>ایمیل</label>
                                    <input class="form-control" dir="ltr" id="user_email" name="user_email" type="email"
                                           required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label>نام کاربری</label>
                                    <input class="form-control" id="user_name" name="user_name" required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label>رمزعبور</label>
                                    <input type="password" class="form-control" id="user_password" name="user_password"
                                           required>
                                </div>

                                <div class="col-md-3 mt-2">
                                    <label>دسترسی</label>
                                    <select class="form-control select2" id="permission_id" name="permission_id"
                                            required>
                                        <option selected disabled>یک مورد را انتخاب کنید</option>
                                        {foreach $userRole as $item}
                                            <option value="{$item->id}">{$item->per_name}</option>
                                        {/foreach}
                                    </select>
                                </div>

                                <div class="col-md-12 mt-4">
                                    <button class="btn btn-primary float-right">
                                        ثبت
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{include 'sections/footer.tpl'}
