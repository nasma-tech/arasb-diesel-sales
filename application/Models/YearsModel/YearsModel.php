<?php

namespace App\Models\YearsModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class YearsModel extends Model
{
    protected $table = 'tbl_Years';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        "year_value",
        "from",
        "to",
        "updated_at",
        "deleted_at",
    ];
}