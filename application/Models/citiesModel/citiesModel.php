<?php

namespace App\Models\citiesModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class citiesModel extends Model
{
    protected $table = 'tbl_Cities';
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