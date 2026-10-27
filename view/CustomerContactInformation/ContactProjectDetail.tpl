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
                        <h4 class="card-title">شماره پروژه : <kbd>{$getData.project_code}</kbd></h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshBtn()}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 3px">
            <div class="col-md-6">
                {include 'CustomerContactInformation/ContactProject.tpl'}
            </div>
            <div class="col-md-6 pl-0">
                <form action="/ContactProjectsFollowUp/add" method="post">
                    {$csrf->csrfTokenInput()}
                    <input type="hidden" name="contact_project_id" value="{$getData.id}"readonly="readonly">
                    {include 'CustomerContactInformation/ContactProjectFollowUp.tpl'}
                </form>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}
