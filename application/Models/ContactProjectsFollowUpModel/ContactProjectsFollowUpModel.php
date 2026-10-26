<?php

namespace App\Models\ContactProjectsFollowUpModel;

use App\Models\ContactProjectsFollowUpActionsModel\ContactProjectsFollowUpActionsModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactProjectsFollowUpModel extends Model
{
    protected $table = 'ContactProjectsFollowUp';
    protected $primaryKey = 'id';
    public $timestamps = false;

    use SoftDeletes;

    protected $fillable = [
        'contact_project_id',
        'FollowUp_action_id',
        'next_followUp_date',
        'followUp_description',
        'user_id',
        'deleted_at',
    ];

    public function followUpActions(): HasOne
    {
        return $this->hasOne(ContactProjectsFollowUpActionsModel::class, 'contact_project_followUp_id', 'id');
    }

}