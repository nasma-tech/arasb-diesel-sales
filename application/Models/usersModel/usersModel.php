<?php

namespace App\Models\usersModel;

use App\Models\rolesModel\rolesModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class usersModel extends Model
{
    protected $table = 'tbl_Users';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'full_name',
        'national_code',
        'mobile',
        'email',
        'username',
        'password',
        'image_address',
        'permission_id',
        'user_id',
        'updated_at',
        'deleted_at',
    ];

    public function staffPermissionData()
    {
        return $this->hasOne(rolesModel::class, 'id', 'permission_id');
    }
}