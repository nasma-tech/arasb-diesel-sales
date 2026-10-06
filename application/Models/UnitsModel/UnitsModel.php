<?php

namespace App\Models\UnitsModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitsModel extends Model
{
    protected $table = 'tbl_Units';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'unit_name',
        'unit_symbol',
        'user_id',
        'update_at',
        'deleted_at'
    ];

}