import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard} from '../services/user.guard';

//Cargar Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//array de configuración de rutas, tipo ruta, habrá una ruta padre y varias hijas, canActivate es para pasar por el modulo userguard, que se fijará si el usuario inició sesión correctamente
const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        canActivate: [UserGuard],
        children: [
            {path: '', component: ListComponent},
            {path: 'listado', component: ListComponent},
            {path: 'crear', component: AddComponent},
            {path: 'editar/:id', component: EditComponent}
        ]
    }
];

//exportar el módulo para poder utilizarlo después utilizamos un decorador para utilizar metapropiedades
@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PanelRoutingModule {

}