import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdministracionHistoriasComponent} from "./administracion-historias.component";
import {BodyCrearComponent} from "./body-crear/body-crear.component";
import {BodyHistorialComponent} from "./body-historial/body-historial.component";
import {BodyQuestionComponent} from "./body-question/body-question.component";
import {BodyVocabularyComponent} from "./body-vocabulary/body-vocabulary.component";
import {BodyIdTitleComponent} from "./body-id-title/body-id-title.component";
import {AuthGuard} from "../auth.guard";
import {IniciarHistoriaComponent} from "../iniciar-historia/iniciar-historia.component";


const routes: Routes = [
  { path: '', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyCrearComponent}], canActivate: [AuthGuard]},
  { path: 'crea', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyCrearComponent}], canActivate: [AuthGuard]},
  { path: 'historial', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyHistorialComponent}], canActivate: [AuthGuard]},
  { path: 'idtitulo', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyIdTitleComponent}], canActivate: [AuthGuard]},
  { path: 'quiz', component: IniciarHistoriaComponent, children: [ {path: '', component: BodyQuestionComponent}], canActivate: [AuthGuard]},
  { path: 'vocabulario', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyVocabularyComponent}], canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionHistoriasRoutingModule { }
