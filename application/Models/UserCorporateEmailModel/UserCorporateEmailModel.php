<?php

namespace App\Models\UserCorporateEmailModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserCorporateEmailModel extends Model
{
    protected $table = 'tbl_UserCorporateEmail';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'user_ids',
        'mail_host',
        'mail_address',
        'mail_password',
        'mail_port',
        'mail_secure',
        'internal_number',
        'organizational_phone',
        'user_AliasName',
        'user_id',
        'updated_at',
        'deleted_at'
    ];
}