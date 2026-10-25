<?php

namespace App\Models\SocialNetworksListModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialNetworksListModel extends Model
{
    protected $table = 'SocialNetworksList';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'title',
        'icon',
        'user_id',
        'updated_at',
        'deleted_at',
    ];

}