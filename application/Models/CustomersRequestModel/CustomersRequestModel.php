<?php

namespace App\Models\CustomersRequestModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomersRequestModel extends Model
{
    protected $table = 'CustomersRequest';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'request_date',
        'request_type',
        'customer_address',
        'requester',
        'customer_fullname',
        'customer_number',
        'customer_product',
        'chassis_number',
        'request_basin',
        'request_description',
        'user_id'
    ];

}