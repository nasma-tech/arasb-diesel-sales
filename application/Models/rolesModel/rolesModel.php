<?php

namespace App\Models\rolesModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class rolesModel extends Model
{
    protected $table = 'tbl_Roles';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        "per_name",
        "per_short_name",
        "access_json",
        "per_status",
        "user_id",
        "updated_at",
        "deleted_at",
    ];

}