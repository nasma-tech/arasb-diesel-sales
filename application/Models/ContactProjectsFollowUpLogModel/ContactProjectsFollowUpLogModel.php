<?php

namespace App\Models\ContactProjectsFollowUpLogModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactProjectsFollowUpLogModel extends Model
{
    protected $table = 'ContactProjectsFollowUpLog';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'contact_project_follow_up_id',
        'user_referral_from_id',
        'user_referral_to_id',
        'referral_description',
    ];

}