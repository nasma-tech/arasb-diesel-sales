<?php
namespace App\Controllers\ContactProjects;
use App\Controllers\scheme\ControllerScheme;
class ContactProjects extends ControllerScheme{
        const string singleName = '';
        const string pluralName = '';
        protected string $defaultModel = ContactProjectsModel::class;
        
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
            //'js/ContactProjects/ContactProjects'
        ],
            ['vendors/css/tables/datatable/datatables.min'],
            [
            //vars
                ])->display('ContactProjects/ContactProjects.tpl');
    }
    
        public function addIndex(){
                view->setPageTitle(self::pluralName);
                view->setSingleName(self::singleName);
                view->setPluralName(self::pluralName);
                view->ui([
                    //'js/ContactProjects/add-ContactProjects'
                ], [],
                    [//vars
                    ]
                )->display('ContactProjects/add-ContactProjects.tpl');
            }
            
        public function editIndex($id){
        view->setPageTitle(self::pluralName);
        view->setSingleName(self::singleName);
        view->setPluralName(self::pluralName);
        //name this model
        view->setModel();
        view->ui([
            //'js/ContactProjects/edit-ContactProjects'
        ],[], [
        //var
        ])->display('ContactProjects/edit-ContactProjects.tpl');
    }
}
