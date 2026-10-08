<?php

namespace App\Models\UserModel;

use App\Models\RoleModel\RoleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserModel extends Model
{
    protected $table = 'users';
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
        return $this->hasOne(RoleModel::class, 'id', 'permission_id');
    }
}