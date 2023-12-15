import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent} from "./inicio.component";

import { InicioRoutingModule} from "./inicio-routing.module";
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InteractuaComponent } from './interactua/interactua.component';

import { HeaderRegistroComponent } from './registro/header-registro/header-registro.component';
import { HeaderLoginComponent } from './login/header-login/header-login.component';
import { BodyLoginComponent } from './login/body-login/body-login.component';
import { BodyInteractuaComponent } from './interactua/body-interactua/body-interactua.component';
import { HeaderInteractuaComponent } from './interactua/header-interactua/header-interactua.component';
import { BodyInicioComponent} from "./body-inicio/body-inicio.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule, ButtonDirective } from '@coreui/angular';
import {
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  GutterDirective,
  RowDirective
  } from "@coreui/angular";
import { Body2InteractuaComponent } from './interactua/body2-interactua/body2-interactua.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ModalConfRegComponent } from './registro/modal-conf-reg/modal-conf-reg.component';
import { BodyRegistroComponent} from "./registro/body-registro/body-registro.component";


@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    InteractuaComponent,
    HeaderRegistroComponent,
    HeaderLoginComponent,
    BodyInicioComponent,
    BodyRegistroComponent,
    BodyLoginComponent,
    BodyInteractuaComponent,
    HeaderInteractuaComponent,
    Body2InteractuaComponent,

  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    FormDirective,
    GutterDirective,
    RowDirective,
    FormControlDirective,
    FormLabelDirective,
    FormFeedbackComponent,
    ColComponent,
    AlertModule,
    MatCardModule,
    MatButtonModule,
    ButtonDirective,
    ModalConfRegComponent,
  ]
})
export class InicioModule { }
