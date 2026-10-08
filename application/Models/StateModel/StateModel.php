<?php

namespace App\Models\StateModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StateModel extends Model
{
    protected $table = 'states';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'country_id',
        'state_name',
        'state_area_code',
        'latitude',
        'longitude',
        'hc_key',
        'updated_at',
        'deleted_at',
    ];
}