//Módulos que hay que cargar para que funcione un módulo d eángular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module'; //Importar configuración de rutas del módulo

//Componentes del módulo
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//Servicios

//Configuración de ngModule con el decorador etc
@NgModule({
    declarations:[
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule
    ],
    exports: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent
    ],
    providers: [

    ]
})

export class PanelModule {}