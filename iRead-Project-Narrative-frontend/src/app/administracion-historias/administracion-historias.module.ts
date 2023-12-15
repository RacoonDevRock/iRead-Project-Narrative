import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdministracionHistoriasComponent} from "./administracion-historias.component";
import {AdministracionHistoriasRoutingModule} from "./administracion-historias-routing.module";

import { HeaderAdministrarComponent } from './header-administrar/header-administrar.component';
import { BodyCrearComponent } from './body-crear/body-crear.component';
import { BodyHistorialComponent } from './body-historial/body-historial.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BodyQuestionComponent } from './body-question/body-question.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from "../app.component";
import { BodyVocabularyComponent } from './body-vocabulary/body-vocabulary.component';
import { BodyIdTitleComponent } from './body-id-title/body-id-title.component';



@NgModule({
  declarations: [
    AdministracionHistoriasComponent,
    HeaderAdministrarComponent,
    BodyCrearComponent,
    BodyHistorialComponent,
    BodyQuestionComponent,
    BodyVocabularyComponent,
    BodyIdTitleComponent,
  ],
    imports: [
        CommonModule,
        AdministracionHistoriasRoutingModule,
        MatToolbarModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
  })

export class AdministracionHistoriasModule { }
