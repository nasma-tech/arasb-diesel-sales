<?php

namespace App\Models\CountryModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CountryModel extends Model
{
    protected $table = 'tbl_Countries';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        "country_name",
        "country_english_name",
        "country_area_code",
        "abbreviated_name",
        "user_id",
        "updated_at",
        "deleted_at",
    ];

}