<?php

namespace App\Models\ContactProjectRequestsModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactProjectRequestsModel extends Model
{
    protected $table = 'ContactProjectRequests';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'contact_project_id',
        'car_group_id',
        'car_brand_id',
        'car_model_id',
        'car_tip_id',
        'request_amount',
        'user_id',
        'updated_at',
        'deleted_at'
    ];

}