<?php

namespace App\Models\CustomersRequestDocumentsModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomersRequestDocumentsModel extends Model
{
    protected $table = 'CustomersRequestDocuments';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'customer_request_id',
        'document_name'
    ];

}