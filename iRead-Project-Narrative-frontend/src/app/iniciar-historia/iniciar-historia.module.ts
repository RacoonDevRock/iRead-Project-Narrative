import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IniciarHistoriaComponent} from "./iniciar-historia.component";
import {IniciarHistoriaRoutingModule} from "./iniciar-historia-routing.module";

import { BodyIniciandoComponent } from './body-iniciando/body-iniciando.component';
import { BodyProgresoComponent } from './body-progreso/body-progreso.component';
import { BodyFinalizadoComponent } from './body-finalizado/body-finalizado.component';
import {HeaderVacioComponent} from "./header-vacio/header-vacio.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import { BodyPreFinComponent } from './body-pre-fin/body-pre-fin.component';





@NgModule({
    declarations: [
        IniciarHistoriaComponent,
        BodyIniciandoComponent,
        BodyProgresoComponent,
        BodyFinalizadoComponent,
        HeaderVacioComponent,
        BodyPreFinComponent,
    ],
  exports: [
    BodyIniciandoComponent,
    HeaderVacioComponent
  ],
  imports: [
    CommonModule,
    IniciarHistoriaRoutingModule,
    MatToolbarModule,
  ]
})
export class IniciarHistoriaModule { }
