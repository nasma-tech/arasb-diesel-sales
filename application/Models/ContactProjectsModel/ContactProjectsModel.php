<?php

namespace App\Models\ContactProjectsModel;

use App\Models\ContactProjectsFollowUpModel\ContactProjectsFollowUpModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactProjectsModel extends Model
{
    protected $table = 'ContactProjects';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'contact_id',
        'project_code',
        'payment_type',
        'purchase_type',
        'industry_type_id',
        'expert_id',
        'user_id',
        'updated_at',
        'deleted_at'
    ];

    public function followUpData(): HasMany
    {
        return $this->hasMany(ContactProjectsFollowUpModel::class,'contact_project_id','id');
    }

}