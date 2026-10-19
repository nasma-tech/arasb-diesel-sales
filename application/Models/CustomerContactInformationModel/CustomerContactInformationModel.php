<?php

namespace App\Models\CustomerContactInformationModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerContactInformationModel extends Model
{
    protected $table = 'Contacts';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'contact_type',
        'state_id',
        'city_id',
        'contact_group_id',
        'contact_acquisition_sources',
        'user_id',
        'updated_at',
        'deleted_at',
    ];

}