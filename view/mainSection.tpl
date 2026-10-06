{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title">{$pluralName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshAndBackButton()}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card shadow" style="margin-top: 3px">
                    <div class="card-body">
                        <h5 class="bg-danger text-center text-white p-1 rounded w-100">{$message}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}
