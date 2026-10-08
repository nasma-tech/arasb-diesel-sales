<?php

namespace App\Models\CityModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CityModel extends Model
{
    protected $table = 'cities';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'country_id',
        'state_id',
        'city_name',
        'latitude',
        'longitude',
        'updated_at',
        'deleted_at'
    ];

}