<?php

namespace App\Controllers\auth;

use App\Models\RoleModel\RoleModel;
use App\Models\UserModel\UserModel;

class auth
{
    public $userId {
        get {
            return $this->userId;
        }
        set {
            $this->userId = $value;
        }
    }
    public $userName {
        get {
            return $this->userName;
        }
        set {
            $this->userName = $value;
        }
    }
    public $userFullName {
        get {
            return $this->userFullName;
        }
        set {
            $this->userFullName = $value;
        }
    }
    public $permission {
        get {
            return $this->permission;
        }
        set {
            $this->permission = $value;
        }
    }
    public $userCompanyId {
        get {
            return $this->userCompanyId;
        }
        set {
            $this->userCompanyId = $value;
        }
    }

    public $representationId {
        get {
            return $this->representationId;

        }
        set {
            $this->representationId = $value;
        }
    }

    public $permissionName {
        get {
            return $this->permissionName;

        }
        set {
            $this->permissionName = $value;
        }
    }

    public $userInfo {
        get {
            return $this->userInfo;

        }
        set {
            $this->userInfo = $value;
        }
    }

    public function authentication(): void
    {
        $userName = $_POST['user_name'];
        $userPassword = sha1(md5($_POST['user_password']));
        $userCheck = UserModel::query()->where([
            ['username', '=', $userName],
            ['password', '=', $userPassword]
        ])->first();

        if ($userCheck) {
            $role = RoleModel::query()->find($userCheck->permission_id);

            $this->userName = $userCheck->username;
            $this->userFullName = $userCheck->full_name;
            $this->userId = $userCheck->id;
            $this->permission = $userCheck->permission_id;
            $this->userCompanyId = $userCheck->company_id;
            $this->representationId = $userCheck->representation_id;
            $this->permissionName = (($role) ? $role->per_name : 'سوپر ادمین');
            $this->userInfo = [
                'internalNumber' => ''
            ];
            $_SESSION['userId'] = $this->userId;
            $_SESSION['userName'] = $this->userName;
            $_SESSION['userFullName'] = $this->userFullName;
            $_SESSION['permission'] = $this->permission;
            $_SESSION['userCompanyId'] = $this->userCompanyId;
            $_SESSION['representationId'] = $this->representationId;
            $_SESSION['permissionName'] = $this->permissionName;
            $_SESSION['userInfo'] = $this->userInfo;
            echo 'successLogin';
        } else {
            echo 'userNotFound';
        }
    }

}