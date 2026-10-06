<?php

namespace App\Controllers\users;

use App\Models\UserCorporateEmailModel\UserCorporateEmailModel;
use App\Controllers\scheme\ControllerScheme;
use App\Models\rolesModel\rolesModel;
use App\Models\usersModel\usersModel;
use Packages\Helpers\FileHelper;


class users extends ControllerScheme
{
    const string singleName = 'کاربر';
    const string pluralName = 'کاربران';
    protected string $defaultModel = usersModel::class;

    //user object
    public static function userObject(): object
    {
        return (object)$_SESSION;
    }

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
//            'js/appSettings/users/users'
        ],
            ['vendors/css/tables/datatable/datatables.min'], [
                'list' => usersModel::query()
                    ->with([
                        'staffPermissionData'
                    ])
                    ->get()
            ])->display('users/users.tpl');
    }

    public function addIndex()
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui(['js/users/add-users'], [], [
            'userRole' => rolesModel::all(),
        ])->display('users/add-users.tpl');
    }

    public function editIndex($id)
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->setModel(usersModel::query()->find($id));
        view->ui([
            'js/users/edit-users'
        ], [], [
            'userRole' => rolesModel::all(),
            'userCorporateEmail' => UserCorporateEmailModel::query()->where(['user_ids' => $id])->first()
        ])->display('users/edit-users.tpl');

    }

    public function add()
    {
        csrf->csrfValidate();
        $data = $this->requestArray();

        if ($data['national_code']) {
            $check = usersModel::query()->where(['national_code' => $data['national_code']])->first();
            if ($check) {
                $this->failedCallBack('addIndex', 'کاربر قبلا ثبت شده است');
            } else {
                $makeData = [
                    'username' => $data['user_name'],
                    'password' => sha1(md5($data['user_password'])),
                    'first_name' => trim($data['first_name']),
                    'last_name' => trim($data['last_name']),
                    'full_name' => trim($data['first_name']) . " " . trim($data['last_name']),
                    'national_code' => $data['national_code'],
                    'mobile' => $data['user_mobile'],
                    'email' => $data['user_email'],
                    'permission_id' => $data['permission_id'],
                    'user_id' => userObject()->userId
                ];
                $add = usersModel::query()->create($makeData);
                if ($add->save()) {
                    $fileHelper = new FileHelper();
                    $add->update(['image_address' => $fileHelper->fileUpload('Users', 'user_img', $add->id)]);
                    $this->successCallBack();
                }
            }
        } else {
            $this->failedCallBack('addIndex', 'کد ملی راپر کنید');
        }
    }

    public function edit($id)
    {
        $this->changeRequestValues('password', sha1(md5($this->requestArray()['password'])));
        $this->changeRequestValues('password', sha1(md5($this->requestArray()['password'])));

        if (isset($this->requestArray()['userCorporateData'])) {
            $_POST['userCorporateData']['user_id'] = userObject()->userId;

            UserCorporateEmailModel::query()->updateOrCreate(
                ['user_ids' => $id],
                $this->requestArray()['userCorporateData']
            );

            unset($_POST['userCorporateData']);
        }
        if (!empty($_FILES['user_img']['name'])) {
            $image = fileHelper->fileUpload('Users', 'user_img', $id);
            usersModel::query()->where(['id' => $id])->update(['image_address' => $image]);
        }
        return parent::edit($id);
    }

    public function getUsersForm(): void
    {
        echo json_encode($this->getUsers(), JSON_UNESCAPED_UNICODE);
    }

    public function getUsers(): array
    {
        $get = usersModel::query()
            ->with([
                'staffPermissionData'
            ])
            ->get();

        return array_map(function ($item) {
            return [
                'id' => $item['id'],
                'fullname' => $item['full_name'],
                'avatar' => userHelper->getUserImage($item['id']),
                'position' => (($item['staff_permission_data']) ? $item['staff_permission_data']['per_name'] : ' - '),
            ];
        }, $get->toArray());
    }

}