<?php
namespace App\Controllers\ContactChannel;
use App\Controllers\scheme\ControllerScheme;
use App\Models\ContactChannelModel\ContactChannelModel;

class ContactChannel extends ControllerScheme{
        const string singleName = 'راه ارتباطی';
        const string pluralName = 'راه های ارتباطی';
        protected string $defaultModel = ContactChannelModel::class;
        
        public function main(){
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
            //'js/ContactChannel/ContactChannel'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
                'contactChannelsData' => ContactChannelModel::all()
                ])->display('ContactChannel/ContactChannel.tpl');
    }
    
        public function addIndex(){
                view->setPageTitle(self::pluralName);
                view->setSingleName(self::singleName);
                view->setPluralName(self::pluralName);
                view->ui([
                    //'js/ContactChannel/add-ContactChannel'
                ], [],
                    [//vars
                    ]
                )->display('ContactChannel/add-ContactChannel.tpl');
            }
            
        public function editIndex($id){
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        //name this model
        view->setModel(ContactChannelModel::query()->findOrFail($id));
        view->ui([
            //'js/ContactChannel/edit-ContactChannel'
        ],[], [
        //var
        ])->display('ContactChannel/edit-ContactChannel.tpl');
    }
}
