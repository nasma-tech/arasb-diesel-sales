<?php

namespace App\Models\CustomerContactInformationModel;

use App\Models\CompaniesModel\CompaniesModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerContactInformationModel extends Model
{
    protected $table = 'Contacts';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'contact_type',
        'state_id',
        'city_id',
        'national_code',
        'contact_group_id',
        'contact_acquisition_source_id',
        'user_id',
        'updated_at',
        'deleted_at',
    ];

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(
            CompaniesModel::class,
            'ContactCompanyLinks',
            'contact_id',
            'company_id'
        );
    }

}