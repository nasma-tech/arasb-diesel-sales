{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><!-- error 404 -->
            <section class="row flexbox-container">
                <div class="col-md-12 mt-2">
                    <div class="card bg-transparent shadow-none">
                        <div class="card-content">
                            <div class="card-body text-center bg-transparent miscellaneous">
                                <h1 class="error-title">{$title}</h1>
                                <p class="pb-3">{$description}</p>
                                <img class="img-fluid" style="max-width: 75%!important" src="{APP_URL}/public/images/pages/500.png" alt="500 error">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
</div>

{include 'sections/footer.tpl'}