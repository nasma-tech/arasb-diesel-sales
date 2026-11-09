<?php

namespace App\Models\FishboneModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FishboneModel extends Model
{
    protected $table = 'Fishbone';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'fishbone_name',
        'fishbone_description',
        'user_id',
    ];

}