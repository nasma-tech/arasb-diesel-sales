<?php

namespace App\Controllers\states;

use App\Controllers\scheme\ControllerScheme;
use App\Models\countriesModel\countriesModel;
use App\Models\statesModel\statesModel;
use Illuminate\Pagination\Paginator;

Paginator::useBootstrap();

class states extends ControllerScheme
{
    const string singleName = 'استان';
    const string pluralName = 'استان ها';
    protected string $defaultModel = statesModel::class;

    public function main(): void
    {
        $states = statesModel::query()->paginate(10);
        Paginator::useBootstrap();
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
            'js/states/states'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'states' => $states,
                'country' => new countriesModel()
            ])->display('states/states.tpl');
    }

    public function addIndex(): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'js/states/add-states'
        ], [],
            [
                'countries' => countriesModel::all()
            ]
        )->display('states/add-states.tpl');
    }

    public function editIndex($id): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->setModel(statesModel::query()->find($id));
        view->ui([
            'js/states/edit-states'
        ], '', [
            'countries' => countriesModel::all()
        ])->display('states/edit-states.tpl');
    }

    public function getFilterStates(): void
    {
        $countryId = $this->requestArray()['value'];
        $output = [];
        $country = statesModel::query()->where('country_id', '=', $countryId)->get();
        foreach ($country as $item) {
            $output[] = [
                'id' => $item->id,
                'title' => $item->state_name
            ];
        }
        echo json_encode($output, JSON_UNESCAPED_UNICODE);
    }

    public function getMapInfo(): void
    {
        $id = $this->requestArray()['id'];
        $get = statesModel::query()->find($id);
        $output = [];
        $output['latitude'] = $get->latitude;
        $output['longitude'] = $get->longitude;
        echo json_encode($output, JSON_UNESCAPED_UNICODE);
    }

}