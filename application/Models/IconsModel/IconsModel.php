<?php

namespace App\Models\IconsModel;
use Illuminate\Database\Eloquent\Model;

class IconsModel extends Model
{
    protected $table = 'tbl_Icons';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'title'
    ];

}