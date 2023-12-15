import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {IniciarHistoriaComponent} from "./iniciar-historia.component";
import {BodyIniciandoComponent} from "./body-iniciando/body-iniciando.component";
import {BodyProgresoComponent} from "./body-progreso/body-progreso.component";
import {BodyFinalizadoComponent} from "./body-finalizado/body-finalizado.component";
import {AuthGuard} from "../auth.guard";
import {BodyPreFinComponent} from "./body-pre-fin/body-pre-fin.component";

const routes: Routes = [
  { path: '', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyIniciandoComponent}]},
  { path: 'progreso', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyProgresoComponent}]},
  { path: 'preterminar', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyPreFinComponent}]},
  { path: 'terminar', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyFinalizadoComponent}]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciarHistoriaRoutingModule { }
