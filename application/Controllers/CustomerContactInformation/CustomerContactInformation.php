<?php

namespace App\Controllers\CustomerContactInformation;

use App\Controllers\scheme\ControllerScheme;
use App\Models\CarsBrandModel\CarsBrandModel;
use App\Models\CarsGroupModel\CarsGroupModel;
use App\Models\CompaniesModel\CompaniesModel;
use App\Models\ContactAcquisitionSourcesModel\ContactAcquisitionSourcesModel;
use App\Models\ContactPhonesModel\ContactPhonesModel;
use App\Models\ContactsGroupModel\ContactsGroupModel;
use App\Models\CustomerContactInformationModel\CustomerContactInformationModel;
use App\Models\FollowUpActionsTitleModel\FollowUpActionsTitleModel;
use App\Models\IndustryTypeModel\IndustryTypeModel;
use App\Models\StateModel\StateModel;

class CustomerContactInformation extends ControllerScheme
{
    const string singleName = 'مخاطب';
    const string pluralName = 'مخاطبین';
    protected string $defaultModel = CustomerContactInformationModel::class;

    public function main(): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'vendors/js/tables/datatable/datatables.min',
            'vendors/js/tables/datatable/dataTables.bootstrap4.min',
            'vendors/js/tables/datatable/dataTables.buttons.min',
            'vendors/js/tables/datatable/buttons.html5.min',
            'vendors/js/tables/datatable/buttons.print.min',
            'vendors/js/tables/datatable/buttons.bootstrap.min',
            'vendors/js/tables/datatable/jszip.min',
            'vendors/js/tables/datatable/pdfmake.min',
            'vendors/js/tables/datatable/vfs_fonts',
            'vendors/js/tables/datatable/buttons.colVis.min',
            //'js/CustomerContactInformation/CustomerContactInformation'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'list' => CustomerContactInformationModel::query()->get()
            ])->display('CustomerContactInformation/CustomerContactInformation.tpl');
    }

    public function addIndex(): void
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        view->ui([
            'js/CustomerContactInformation/add-CustomerContactInformation',
            'js/CustomerContactInformation/ContactInfo',
            'js/CustomerContactInformation/ContactPhones',
            'js/CustomerContactInformation/ContactProject',
            'js/CustomerContactInformation/ContactFollowUp',
        ], [],
            [
                'IndustryType' => IndustryTypeModel::query()->get(),
                'FollowUpActionsTitle' => FollowUpActionsTitleModel::query()->get()
            ]
        )->display('CustomerContactInformation/add-CustomerContactInformation.tpl');
    }

    public function editIndex($id)
    {
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        //name this model
        view->setModel();
        view->ui([
            //'js/CustomerContactInformation/edit-CustomerContactInformation'
        ], [], [
            //var
        ])->display('CustomerContactInformation/edit-CustomerContactInformation.tpl');
    }

    private function addContactInfo()
    {
        $data = $this->requestArray();
        $subscriberData = [
            'contact_type' => $data['contact_type'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'contact_group_id' => $data['contact_group_id'],
            'contact_acquisition_source_id' => $data['contact_acquisition_source_id'],
        ];
        if ($data['contact_type'] == 1) {
            $dataForm = [
                'national_code' => $data['national_code'],
                'state_id' => $data['state_id'],
                'city_id' => $data['city_id'],
                'user_id' => userObject()->userId,
            ];
            $mergeData = array_merge($subscriberData, $dataForm);
            return CustomerContactInformationModel::query()->create($mergeData)->id;
        } elseif ($data['contact_type'] == 2) {
            $dataForm = [
                'national_ID' => $data['national_ID'],
                'economic_code' => $data['economic_code'],
                'company_name' => $data['company_name'],
                'establishment_date' => $data['establishment_date'],
                'company_status' => 1,
                'registration_number' => $data['registration_number'],
                'address' => $data['address'],
                'postal_code' => $data['postal_code'],
            ];
            $mergeData = array_merge($subscriberData, $dataForm);
            $addContact = CustomerContactInformationModel::query()->create($mergeData);
            $addCompanies = CompaniesModel::query()->create($dataForm);
            $addContact->companies()->attach($addCompanies->id);
            return $addContact->id;
        }else{
            return false;
        }
    }

    private function addContactPhones($contactId)
    {
        if (isset($this->requestArray()['contactPhone'])) {
            $data = $this->requestArray()['contactPhone'];
            foreach ($data as $item) {
                $item['contact_id'] = $contactId;
                $item['user_id'] = userObject()->userId;
                ContactPhonesModel::query()->create($item);
            }
            return true;
        } else {
            return false;
        }
    }

    private function addContactProject()
    {
        var_print($this->requestArray());
    }

    public function add()
    {
//        $addContact = $this->addContactInfo();
//        $addPhones = $this->addContactPhones($addContact);
        $this->addContactProject();
    }
}
