import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { StudentService} from "../../../services/student.service";
import { Student} from "../../../Modelo/Student";
import { StoryDTORequest } from "../../../Modelo/StoryDTORequest";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-body2-interactua',
  templateUrl: './body2-interactua.component.html',
  styleUrls: ['./body2-interactua.component.css']
})
export class Body2InteractuaComponent implements OnInit{

  @ViewChild('nameStudent') nameKey!: ElementRef;
  constructor(private router:Router, private fb: FormBuilder, private studentService: StudentService, private sharedService:SharedService) {
  }

  public storyDTORequest: StoryDTORequest = new StoryDTORequest();


  student: Student = { id: 0, nameStudent: '' };
  accessWord: string = '';
  public text: string="";
  public text2: string="";
  nombre: string = "";
  // @ts-ignore
  formulario: FormGroup;
  public page = 1;
  public ddd:boolean=false;


  accessGranted: boolean = false;  // Indica si se concedió el acceso

  anteriorPaso() {
    if (this.page === 2) {
      this.page = 1;
    }
    else {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {

  }

  public enviarCodigo(){
    this.page=2;
  }
  public enviarName(){
    if(this.ddd){
      this.router.navigateByUrl("/desarrollar");
    }
    else{
      this.router.navigateByUrl("/interactuar");
    }
    localStorage.setItem("nameStudent",this.nameKey.nativeElement.value);

  }




  get f() {return this.formulario.controls; }

  //aqui va el metodo
  accessStory() {
    this.accessWord=this.text;
    this.sharedService.setText(this.text);
    console.log('Palabra:', this.accessWord);
    this.studentService.accessStory(this.accessWord).subscribe(
      (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.active){
            this.ddd=true;
            console.log('estado false');
          }
          else {
            this.ddd=false;
            console.log('estado:', response.active, this.ddd);
          }
          this.sharedService.setActive(response.active);
           this.sharedService.setStoryActivityId(response.storyId);
          console.log('activity id:', response.storyId);

          console.log('Acceso concedido a la historia');
          this.enviarCodigo()
      },
      (error) => {
        window.alert('La palabra de acceso no es válida');
        console.error('Error al intentar acceder a la historia:', error);
      }
    );
  }

  public studentId=0;

  registerStudent() {
    this.student.id = this.studentId;  // Asigna el id al estudiante
    this.student.nameStudent = this.text2;
    this.sharedService.setText2(this.text2);

    this.studentService.enterName(this.student).subscribe(
      (response) => {
        if (response != null) {
          console.log('Estudiante registrado exitosamente:', response);
          this.enviarName();

          this.sharedService.setStudentId(response.id);  // Asigna el id del estudiante obtenido del servidor
          console.log('estudiante id:', response.id);
        }
      },
      (error) => {
        window.alert('Nombre no valido');
        console.error('Error al registrar al estudiante:', error);
      }
    );
  }
}
