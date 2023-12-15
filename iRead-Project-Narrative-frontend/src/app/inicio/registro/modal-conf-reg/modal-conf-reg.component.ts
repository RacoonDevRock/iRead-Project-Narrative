import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-conf-reg',
  templateUrl: './modal-conf-reg.component.html',
  styleUrls: ['./modal-conf-reg.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    MatDialogModule
  ],
})
export class ModalConfRegComponent {

}
