import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BodyEsperaComponent} from "./body-espera/body-espera.component";
import {InteractuarHistoriaComponent} from "./interactuar-historia.component";
import {BodyInteraccionComponent} from "./body-interaccion/body-interaccion.component";
import {BodyResultadoComponent} from "./body-resultado/body-resultado.component";
import {InicioComponent} from "../inicio/inicio.component";

const routes: Routes = [
  { path: '', component: InteractuarHistoriaComponent, children: [ {path: '', component: BodyEsperaComponent}]},
  { path: 'desarrollar', component: InteractuarHistoriaComponent, children: [ {path: '', component: BodyInteraccionComponent}]},
  { path: 'resultado', component: InteractuarHistoriaComponent, children: [ {path: '', component: BodyResultadoComponent}]},
  { path: 'interactua', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractuarHistoriaRoutingModule { }
