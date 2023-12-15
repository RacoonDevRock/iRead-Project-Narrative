import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { QuestionService } from "../../service/question.service";
import { SharedService } from "../../services/shared.service";
import { Subscription, interval, Subject } from 'rxjs';
import { StudentService } from "../../services/student.service";
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-body-espera',
  templateUrl: './body-espera.component.html',
  styleUrls: ['./body-espera.component.css']
})

export class BodyEsperaComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public titAutList: any = [];
  public estado: boolean = false;
  private subscription: Subscription;
  accessWord: string = '';
  text: string = "";
  public estado1: boolean = false;

  constructor(private router: Router,
              private http: HttpClient,
              private questionService: QuestionService,
              private sharedService: SharedService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.gettitAutData();
    this.subscription = interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        try {
          console.log("ejecutandome...")
          this.accessStory();
          this.checkActiveStatus();
        } catch (error) {
          console.error('Error en el intervalo:', error);
          this.unsubscribeInterval();
        }
      });
  }

  ngOnDestroy() {
    // Detener la ejecución del intervalo al destruir el componente
    this.unsubscribeInterval();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private unsubscribeInterval() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  gettitAutData() {
    this.questionService.getTitautJson()
      .subscribe(res => {
        if (res && res.titaut) {
          this.titAutList = res.titaut;
        } else {
          // La respuesta no tiene el formato esperado
          console.error('Formato de respuesta no válido:', res);
        }
      });
  }

  llevar() {
    this.router.navigate(['/interactua']);
  }

  private checkActiveStatus() {
    this.estado = this.sharedService.getActive();
    if (this.estado) {
      console.log('estado:', this.estado);
      this.router.navigate(['/desarrollar']);
      this.unsubscribeInterval();
    } else {
      console.log('estado:', this.estado);
      this.router.navigate(['/interactuar']);
    }
  }

  accessStory() {
    this.accessWord = this.sharedService.getText();
    console.log('Palabra:', this.accessWord);
    this.studentService.accessStory(this.accessWord).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.sharedService.setActive(response.active);
        console.log('estado:', this.estado);
        console.log('Acceso concedido a la historia');
      },
      (error) => {
        window.alert('La palabra de acceso no es válida');
        console.error('Error al intentar acceder a la historia:', error);
      }
    );
  }
}
