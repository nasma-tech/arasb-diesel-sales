<?php

namespace App\Controllers\roles;

use App\Controllers\scheme\ControllerScheme;
use App\Models\MenuModel\MenuModel;
use App\Models\RoleModel\RoleModel;


class roles extends ControllerScheme
{
    const string singleName = 'دسترسی';
    const string pluralName = 'دسترسی ها';
    protected string $defaultModel = RoleModel::class;

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
            'js/roles/roles'
        ], [
            'vendors/css/tables/datatable/datatables.min'
        ], [
            'permission' => RoleModel::all(),
        ])->display('roles/roles.tpl');
    }

    public function addIndex(): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'js/roles/add-roles'
        ], '', [
            'permissions' => RoleModel::all(),
            'menuList' => new MenuModel()
        ])->display('roles/add-role.tpl');
    }

    public function editIndex($id): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->setModel(RoleModel::query()->find($id));
        view->ui([
            'js/roles/edit-roles'
        ], '', [
            'permissions' => RoleModel::all(),
            'menuList' => new MenuModel()
        ])->display('roles/edit-role.tpl');
    }

    public function add(): void
    {
        $array = array_map(function ($item) {
            return $item;
        }, $this->requestArray()['parentMenu']);
        csrf->csrfValidate();
        $addStaffPermissions = RoleModel::query()->create();
        $addStaffPermissions->per_name = $this->requestArray()['per_name'];
        $addStaffPermissions->per_short_name = $this->requestArray()['per_short_name'];
        $addStaffPermissions->per_status = $this->requestArray()['per_status'];
        $addStaffPermissions->access_json = json_encode($array, JSON_UNESCAPED_UNICODE);
        if ($addStaffPermissions->save()) {
            $this->successCallBack('addIndex');
        } else {
            $this->failedCallBack('/main');
        }
    }


    public function edit($id): void
    {
        $array = array_map(function ($item) {
            return $item;
        }, $this->requestArray()['parentMenu']);
        csrf->csrfValidate();
        $editStaffPermissions = RoleModel::query()->find($id);
        $editStaffPermissions->per_name = $this->requestArray()['per_name'];
        $editStaffPermissions->per_short_name = $this->requestArray()['per_short_name'];
        $editStaffPermissions->per_status = $this->requestArray()['per_status'];
        $editStaffPermissions->access_json = json_encode($array, JSON_UNESCAPED_UNICODE);
        if ($editStaffPermissions->save()) {
           echo 'save Ok';
        }
    }

}