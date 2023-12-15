import { Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, RouterModule} from "@angular/router";
import { MatDialog, MatDialogModule} from "@angular/material/dialog";
import { ModalConfRegComponent} from "../modal-conf-reg/modal-conf-reg.component";


@Component({
  selector: 'app-body-registro',
  templateUrl: './body-registro.component.html',
  styleUrls: ['./body-registro.component.css']
})
export class BodyRegistroComponent implements OnInit{
  postTeacherForm: FormGroup;
  public paso = 1;

  constructor(private teacherService:AuthService,
              private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.postTeacherForm = this.fb.group({})
  }

  ngOnInit() {
    this.postTeacherForm = this.fb.group({
      name: [null,[Validators.required]],
      surname: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]],
      newsletterCtrl: [false]
    })
    console.warn()
  }

  siguientePaso() {
    this.paso = 2;
  }

  anteriorPaso() {
    if (this.paso === 2) {
      this.paso = 1;
    }
    else {
      this.router.navigate(['/unete']);
    }
  }

  register() {
    if (this.postTeacherForm.valid) {
      // Llama al servicio para registrar al profesor
      const nuevoProfesor = this.postTeacherForm.value;
      this.openDialog();
      this.teacherService.register(nuevoProfesor).subscribe(
        (response) => {
          console.log('Profesor registrado exitosamente', response);
          // Puedes hacer algo adicional aquí si es necesario

        },
        (error) => {
          console.error('Error al registrar el profesor', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }



  openDialog() {
    const dialogRef = this.dialog.open(ModalConfRegComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
