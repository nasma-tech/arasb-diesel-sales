<?php

namespace App\Controllers\CartableDefinition\cities;

use App\Controllers\scheme\ControllerScheme;
use App\Models\citiesModel\citiesModel;
use App\Models\countriesModel\countriesModel;
use App\Models\statesModel\statesModel;

class cities extends ControllerScheme
{
    const string singleName = 'شهر';
    const string pluralName = 'شهر ها';
    protected string $defaultModel = citiesModel::class;

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
            'js/cities/cities'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'cities' => citiesModel::all(),
                'state' => new statesModel()
            ])->display('cities/cities.tpl');
    }

    public function addIndex(): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'js/cities/add-cities'
        ], '', [
            'country' => countriesModel::all(),
            'states' => statesModel::all()
        ])->display('cities/add-cities.tpl');
    }

    public function editIndex($id): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->setModel(citiesModel::query()->find($id));
        view->ui([
            'js/cities/cities'
        ], '', [
            'country' => countriesModel::all(),
            'states' => statesModel::all()
        ])->display('cities/edit-cities.tpl');
    }

    public function getFilterCities(): void
    {
        $stateId = $this->requestArray()['value'];
        $get = citiesModel::query()->where('state_id', $stateId)->get()->toArray();
        echo json_encode(array_map(function ($item) {
            return [
                'id' => $item['id'],
                'title' => $item['city_name'],
            ];
        }, $get), JSON_UNESCAPED_UNICODE);
    }

    public function getMapInfo(): void
    {
        $id = $this->requestArray()['id'];
        $output = [];
        $get = citiesModel::query()->find($id);
        $output['latitude'] = $get->latitude;
        $output['longitude'] = $get->longitude;
        echo json_encode($output, JSON_UNESCAPED_UNICODE);
    }


}