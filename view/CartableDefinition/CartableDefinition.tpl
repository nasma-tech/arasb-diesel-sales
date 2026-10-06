{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">لیست {$pluralName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshAndAddButton({$singleName})}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <table class="table tableDataShow"
                                   style="background-color: #fff;border-radius: 5px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th class="border">#</th>
                                    <th class="border">عنوان کارتابل (فارسی)</th>
                                    <th class="border">عنوان کارتابل (انگلیسی)</th>
                                    <th class="border">مدل</th>
                                    <th class="border">صفحه view</th>
                                    <th class="border">صفحه service</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foreach $getData as $key =>$item}
                                    <tr>
                                        <td class="border">{$key + 1}</td>
                                        <td class="border">{$item->form_persian_title}</td>
                                        <td class="border">{$item->form_english_title}</td>
                                        <td class="border">{$item->cartable_model}</td>
                                        <td class="border">{$item->view_address}</td>
                                        <td class="border">{$item->service_address}</td>
                                    </tr>
                                {/foreach}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}
