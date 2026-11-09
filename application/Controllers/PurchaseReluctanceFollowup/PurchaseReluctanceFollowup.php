<?php

namespace App\Controllers\PurchaseReluctanceFollowup;

use App\Controllers\scheme\ControllerScheme;
use App\Models\ContactProjectsFollowUpLogModel\ContactProjectsFollowUpLogModel;
use App\Models\ContactProjectsFollowUpModel\ContactProjectsFollowUpModel;
use App\Models\PurchaseReluctanceFollowupModel\PurchaseReluctanceFollowupModel;

class PurchaseReluctanceFollowup extends ControllerScheme
{
    const string singleName = 'پیگیریه عدم تمایل به خرید';
    const string pluralName = 'پیگیریه های عدم تمایل به خریدر';
    protected string $defaultModel = PurchaseReluctanceFollowupModel::class;
    const array allowListByRoleId = [
        1
    ];

    public function main()
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'vendors/js/tables/datatable/datatables.min',
            'vendors/js/tables/datatable/dataTables.bootstrap4.min',
            'vendors/js/tables/datatable/dataTables.buttons.min',
            'vendors/js/tables/datatable/buttons.html5.min',
            'vendors/js/tables/datatable/buttons.print.min',
            'vendors/js/tables/datatable/buttons.bootstrap.min',
            'vendors/js/tables/datatable/jszip.min',
            'vendors/js/tables/datatable/pdfmake.min',
            'vendors/js/tables/datatable/vfs_fonts',
            'vendors/js/tables/datatable/buttons.colVis.min',
            'js/PurchaseReluctanceFollowup/PurchaseReluctanceFollowup'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'getData' => call_user_func(function () {
                    $query = ContactProjectsFollowUpModel::query()->where([
                        'FollowUp_action_id' => 12,
                    ])
                        ->with('contactProjectData.contactData.ContactNumbers')
                        ->with('userData');
                    if (!in_array(userObject()->roleId, self::allowListByRoleId)) {
                        $query->where('user_id', userObject()->userId);
                    }
                    return $query->get();
                })

            ])->display('PurchaseReluctanceFollowup/PurchaseReluctanceFollowup.tpl');
    }

    public function addIndex()
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
//                    'js/PurchaseReluctanceFollowup/add-PurchaseReluctanceFollowup'
        ], [],
            [//vars
            ]
        )->display('PurchaseReluctanceFollowup/add-PurchaseReluctanceFollowup.tpl');
    }

    public function editIndex($id)
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        //name this model
        view->setModel();
        view->ui([
            //'js/PurchaseReluctanceFollowup/edit-PurchaseReluctanceFollowup'
        ], [], [
            //var
        ])->display('PurchaseReluctanceFollowup/edit-PurchaseReluctanceFollowup.tpl');
    }

    public function referralFollowUp()
    {
        $request = $this->requestArray();
        $data = ContactProjectsFollowUpModel::query()->find($request['id']);
        if ($data) {
            $editLog = ContactProjectsFollowUpLogModel::query()->create([
                'contact_project_follow_up_id' => $data->id,
                'user_referral_from_id' => $data->user_id,
                'user_referral_to_id' => $request['user_id'],
                'referral_description' => $request['referral_description'],
            ]);
            if ($editLog) {
                $edit = $data->update([
                    'user_id' => $request['user_id'],
                    'referral_description' => $request['referral_description'],
                ]);
                if ($edit) {
                    echo 'referralSuccess';
                } else {
                    echo 'referralFail';
                }
            } else {
                echo 'createLogFailed';
            }

        } else {
            echo 'referralNotFound';
        }

    }
}
