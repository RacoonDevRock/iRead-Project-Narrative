import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InicioComponent} from "./inicio.component";
import {LoginComponent} from "./login/login.component";
import {InteractuaComponent} from "./interactua/interactua.component";
import {RegistroComponent} from "./registro/registro.component";
import {BodyInteractuaComponent} from "./interactua/body-interactua/body-interactua.component";
import {Body2InteractuaComponent} from "./interactua/body2-interactua/body2-interactua.component";


const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'interactua', component: InteractuaComponent, children: [ {path: '', component: Body2InteractuaComponent}]},
  { path: 'unete', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
