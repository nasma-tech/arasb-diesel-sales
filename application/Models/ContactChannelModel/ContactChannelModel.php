<?php

namespace App\Models\ContactChannelModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactChannelModel extends Model
{
    protected $table = 'ContactChannel';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'contact_channel_title',
        'user_id',
    ];

}