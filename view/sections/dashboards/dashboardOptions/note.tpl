<div class="col-md-6 mt-1">
    <div class="card shadow">
        <div class="card-header">
            یادداشت ها
        </div>
        <div class="card-body">
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li class="nav-item current">
                    <a class="nav-link active" id="todayTask-tab-fill" data-toggle="tab" href="#todayTask-fill"
                       role="tab" aria-controls="todayTask-fill" aria-selected="true">
                        یادآوری های امروز
                        <span class="badge badge-pill badge-round badge-danger">{((isset($noteActive['today']))?count($noteActive['today']):0)}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="tomorrow-tab-fill" data-toggle="tab" href="#tomorrow-fill" role="tab"
                       aria-controls="tomorrow-fill" aria-selected="false">
                        یادآوری های فردا
                        <span class="badge badge-pill badge-round badge-danger">{((isset($noteActive['tomorrow']))?count($noteActive['tomorrow']):0)}</span>
                    </a>
                </li>
            </ul>

            <div class="tab-content pt-1">
                <div class="tab-pane active" id="todayTask-fill" role="tabpanel" aria-labelledby="todayTask-tab-fill">
                    <div class="table-responsive">
                        <table class="table text-center">
                            <thead class="thead-dark">
                            <tr>
                                <th class="border">شماره پیشفاکتور</th>
                                <th class="border">مشتری</th>
                                <th class="border">شرکت مشتری</th>
                            </tr>
                            </thead>
                            <tbody>
                            {if isset($noteActive['today'])}
                                {foreach $noteActive['today'] as $item}
                                    <tr>
                                        <td class="border"><a href="/advanceInvoices/viewIndex/{$item['advance_invoice_id']}" target="_blank"></a>{$item['invoices_number']}</td>
                                        <td class="border">{ORM::for_table('qc_Customers')->find_one($item['customer_id'])->customer_full_name}</td>
                                        <td class="border">{(($item['customer_company_id'] > 0)?ORM::for_table('qc_Customer_Company')->find_one($item['customer_company_id'])->customer_company_name:' - ')}</td>
                                    </tr>
                                {/foreach}
                            {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="tomorrow-fill" role="tabpanel" aria-labelledby="tomorrow-tab-fill">
                    <div class="table-responsive">
                        <table class="table text-center">
                            <thead class="thead-dark">
                            <tr>
                                <th class="border">شماره پیشفاکتور</th>
                                <th class="border">مشتری</th>
                                <th class="border">شرکت مشتری</th>
                            </tr>
                            </thead>
                            <tbody>
                            {if isset($noteActive['tomorrow'])}
                                {foreach $noteActive['tomorrow'] as $item}
                                    <tr>
                                        <td class="border">{$item['invoices_number']}</td>
                                        <td class="border">{ORM::for_table('qc_Customers')->find_one($item['customer_id'])->customer_full_name}</td>
                                        <td class="border">{(($item['customer_company_id'] > 0)?ORM::for_table('qc_Customer_Company')->find_one($item['customer_company_id'])->customer_company_name:' - ')}</td>
                                    </tr>
                                {/foreach}
                            {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>