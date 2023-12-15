import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteractuarHistoriaComponent} from "./interactuar-historia.component";
import { InteractuarHistoriaRoutingModule} from "./interactuar-historia-routing.module";

import { BodyEsperaComponent } from './body-espera/body-espera.component';
import { BodyInteraccionComponent } from './body-interaccion/body-interaccion.component';
import { BodyResultadoComponent } from './body-resultado/body-resultado.component';
import { IniciarHistoriaModule} from "../iniciar-historia/iniciar-historia.module";
import { MatToolbarModule} from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { ChangeBg2Directive } from "./change-bg2.directive";




@NgModule({
  declarations: [
    InteractuarHistoriaComponent,
    BodyEsperaComponent,
    BodyInteraccionComponent,
    BodyResultadoComponent,
    ChangeBg2Directive,


  ],
  imports: [
    CommonModule,
    InteractuarHistoriaRoutingModule,
    IniciarHistoriaModule,
    MatToolbarModule,
    HttpClientModule,
  ]
})
export class InteractuarHistoriaModule { }
