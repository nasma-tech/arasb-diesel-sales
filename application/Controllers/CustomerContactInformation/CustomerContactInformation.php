<?php

namespace App\Controllers\CustomerContactInformation;

use App\Controllers\scheme\ControllerScheme;
use App\Models\CustomerContactInformationModel\CustomerContactInformationModel;
use App\Models\StateModel\StateModel;

class CustomerContactInformation extends ControllerScheme
{
    const string singleName = 'مخاطب';
    const string pluralName = 'مخاطبین';
    protected string $defaultModel = CustomerContactInformationModel::class;

    public function main(): void
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
            //'js/CustomerContactInformation/CustomerContactInformation'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'list'=>CustomerContactInformationModel::query()->get()
            ])->display('CustomerContactInformation/CustomerContactInformation.tpl');
    }

    public function addIndex()
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'js/CustomerContactInformation/add-CustomerContactInformation'
        ], [],
            [
                'states'=>StateModel::query()->where('country_id',102)->get()
            ]
        )->display('CustomerContactInformation/add-CustomerContactInformation.tpl');
    }

    public function editIndex($id)
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        //name this model
        view->setModel();
        view->ui([
            //'js/CustomerContactInformation/edit-CustomerContactInformation'
        ], [], [
            //var
        ])->display('CustomerContactInformation/edit-CustomerContactInformation.tpl');
    }
}
