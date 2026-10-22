<?php

namespace App\Models\ContactPhonesModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactPhonesModel extends Model
{
    protected $table = 'ContactPhones';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'contact_id',
        'contact_phone_label_id',
        'phone_number',
        'user_id',
    ];

}