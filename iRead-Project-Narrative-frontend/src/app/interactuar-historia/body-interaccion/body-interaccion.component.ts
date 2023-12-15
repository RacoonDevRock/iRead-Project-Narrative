import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { interval } from "rxjs";
import {SharedService} from "../../services/shared.service";
import {StoriesService} from "../../services/stories.service";
import {Activity} from "../../Modelo/Activity";
import { StudentActivity} from "../../Modelo/StudentActivity";
import {StudentService} from "../../services/student.service";
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {ContWord} from "../../Modelo/ContWord";

@Component({
  selector: 'app-body-interaccion',
  templateUrl: './body-interaccion.component.html',
  styleUrls: ['./body-interaccion.component.css']
})
export class BodyInteraccionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;

  consultedWords: { palabra: string, consultCount: number }[] = [];

  accessWord: string = '';
  public estado: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public malas:any =0;
  selectedPanel: number | null = null;
  vocabclick1: boolean = false;
  vocabclick2: boolean = false;
  vocabclick3: boolean = false;
  storyIdActivity:number=0;
  activity: Activity;
  click1 = 0;
  click2 = 0;
  click3 = 0;
  cont = false;
  cont2 = false;
  cont3 = false;
  public nameStudent: String = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public currentlienzo: number = 0;
  public points: any = 0;
  counter = 300;
  public correctAnswer: any = 0;
  public inCorrectAnswer: any = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  qscli: boolean = false;
  hasAnswered: boolean = false;
  //el back me dara este valor
  jsonConvertido: string = "";
  nombreEstudiante:string="";
  public jsonDecodificado: any = "";

  contword: ContWord[];

  interaccion = [
    {
      cantidadCorrectas: "",
      cantidadIorrectas: "",
      cantidadPuntos: "",
    },
  ];

  generateJSON() {
    // Construir el objeto JSON deseado

    const jsonidInteraccion = this.interaccion.map((intr, i) => {
      return {
        cantidadCorrectas: intr.cantidadCorrectas,
        cantidadIorrectas: intr.cantidadIorrectas,
        cantidadPuntos: intr.cantidadPuntos,
      };
    });

    const jsonData = {
      interaccion: jsonidInteraccion,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }


  private instance: any;
  private subscription: Subscription;

  constructor(private router: Router, private questionService: QuestionService, private sharedService:SharedService, private storiesService:StoriesService, private studentService: StudentService) {}

   ngOnInit() {

     this.accessStory()
     this.subscription = interval(2000)
       .pipe(takeUntil(this.destroy$))
       .subscribe(() => {
         try {
           console.log("ejecutandome en desarrollo...")
           this.accessStory();
           this.checkActiveStatus();
           if(this.isQuizCompleted){
             this.completarActividad()
             console.log("se ejecuto el metodo completar")
           }
         } catch (error) {
           console.error('Error en el intervalo:', error);
           this.unsubscribeInterval();
         }
       });

     this.nombreEstudiante = this.sharedService.getTex2t();

    this.startCounter();

    this.storyIdActivity = this.sharedService.getStoryActivityId();
    console.log('id de la actividad:', this.storyIdActivity);
    if (this.storyIdActivity !== null) {
      // Llamar al servicio para obtener las historias del profesor

      this.storiesService.getAllActivities(this.storyIdActivity).subscribe(
        (response) => {
          console.log('Actividades obtenidas correctamente:', response);

          // Loguea la longitud del array de actividades
          console.log('json:', response.jsonConverted);

          // Assuming you want to access the first element of the array
          this.jsonConvertido=response.jsonConverted;
            console.log('jsonConvertido:', this.jsonConvertido);
            this.desconvertirCadenaAJson();

          this.hideButton1 = this.isPalabraTextEmpty(0);
          console.log("estado de la palabra claev 1:", this.hideButton1)
          this.hideButton2 = this.isPalabraTextEmpty(1);
          console.log("estado de la palabra claev 2:", this.hideButton1)
        },
        (error) => {
          console.error('Error al obtener actividades:', error);
          // Manejar el error según tus necesidades
        }
      );

    } else {
      console.error('No se pudo obtener el ID de la actividad.');
      // Manejar el error según tus necesidades
    }


  }

  private unsubscribeInterval() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }


  accessStory() {
    this.accessWord = this.sharedService.getText();
    console.log('Palabra:', this.accessWord);
    this.studentService.accessStory(this.accessWord).subscribe(
      (response) => {
        console.log('Respuesta del servidor dentro del :', response);
        this.sharedService.setActive(response.active);
        this.estado=response.active
        console.log('estado dentro de la actividad:', this.estado);
      },
      (error) => {
        window.alert('La palabra de acceso no es válida');
        console.error('Error al intentar acceder a la historia:', error);
      }
    );
  }

  private checkActiveStatus() {
    this.estado = this.sharedService.getActive();
    if (this.estado) {
      console.log('estado activo:', this.estado);

      //this.router.navigate(['/desarrollar']);

    } else {
      console.log('estado desacticado:', this.estado);
      this.isQuizCompleted=true;
      //this.router.navigate(['/interactuar']);
      this.unsubscribeInterval();
    }
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.unsubscribeInterval();
    this.destroy$.next();
    this.destroy$.complete();
    // Limpieza de CreativeEditorSDK
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  }


  desconvertirCadenaAJson() {
    if (this.jsonConvertido) {
      const decodedString = atob(this.jsonConvertido);
      this.jsonDecodificado = JSON.parse(decodedString);
      console.log('Contenido codificado en base64:', this.jsonConvertido);
      console.log('Contenido decodificado:', this.jsonDecodificado);

      this.jsonDecodificado.questions[this.currentlienzo]?.lienzo
      console.log('lienzo descodificado', this.jsonDecodificado.questions[this.currentlienzo]?.lienzo);
      console.log('lienzo descodificado', this.jsonDecodificado.questions[4]?.lienzo);





    }
    else {
      console.log('revisar');
    }
  }

  consultas=0;

  clickv1() {
    if (!this.vocabclick1) {
      this.click1 = 1;
      this.click2 = 0;
      this.click3 = 0;
      this.vocabclick1 = true;
      this.vocabclick2 = false;
      this.vocabclick3 = false;

      const palabraText = this.jsonDecodificado.questions[this.currentQuestion]?.palabraText[0] || 'No se registró';
      this.updateConsultedWords(palabraText);
    } else {
      this.vocabclick1 = false;
      this.click1 = 0;
    }
    this.consultas = this.consultas + 1;
  }

  clickv2() {
    if (!this.vocabclick2) {
      this.click1 = 0;
      this.click2 = 1;
      this.click3 = 0;
      this.vocabclick1 = false;
      this.vocabclick2 = true;
      this.vocabclick3 = false;

      const palabraText = this.jsonDecodificado.questions[this.currentQuestion]?.palabraText[1] || 'No se registró';
      this.updateConsultedWords(palabraText);
    } else {
      this.vocabclick2 = false;
      this.click2 = 0;
    }
    this.consultas = this.consultas + 1;
  }

  private updateConsultedWords(palabra: string) {
    const index = this.consultedWords.findIndex(item => item.palabra === palabra);
    if (index !== -1) {
      // La palabra ya está en el array, aumenta la cantidad de consultas
      this.consultedWords[index].consultCount += 1; // Aumenta en dos debido a la lógica de la pregunta
    } else {
      // La palabra no está en el array, agrégala
      this.consultedWords.push({palabra, consultCount: 1}); // Inicia en dos debido a la lógica de la pregunta
    }
  }

  clickv3() {
    if (!this.vocabclick3) {
      this.click1 = 0;
      this.click2 = 0;
      this.click3 = 1;
      this.vocabclick1 = false;
      this.vocabclick2 = false;
      this.vocabclick3 = true;

    } else {
      this.vocabclick3 = false;
      this.click3 = 0;
    }
    this.consultas=this.consultas+1;
  }

  getAllQuestions() {
    console.log("revisar getallwuestion")
  }

  qsValide() {
    this.qscli = false;
  }

  nextQuestion() {
    if (this.selectedOption) {
      // Verificar si la opción seleccionada es la correcta
      if (this.selectedOption.correct) {
        this.correctAnswer++;this.points=this.points+4;
      } else {
        this.inCorrectAnswer++;
      }
    } else {
      // En caso de que no se haya seleccionado ninguna opción
      this.inCorrectAnswer++;
    }

    this.selectedOption = null;

    console.log("Correctas:",this.correctAnswer)
    console.log("incorrectas:",this.inCorrectAnswer)
    this.cont = false;
    this.cont2 = false;
    this.cont3 = false;
    this.currentQuestion++;
    this.jsonDecodificado.questions[this.currentlienzo+1].lienzo
    this.vocabclick1 = false;
    this.vocabclick2 = false;
    this.vocabclick3 = false;
    this.click1 = 0;
    this.click2 = 0;
    this.click3 = 0;
    //this.questionList[this.currentlienzo + 1].lienzo;
    this.currentlienzo++;
    this.hasAnswered = false;
    this.qscli = false;
    this.getProgressPorcent();
    if (this.currentQuestion === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }


    this.hideButton1 = this.isPalabraTextEmpty(0);
    console.log("estado de la palabra claev 1:", this.hideButton1)
    this.hideButton2 = this.isPalabraTextEmpty(1);
    console.log("estado de la palabra claev 2:", this.hideButton1)
  }


  isPalabraTextEmpty(index: number): boolean {
    const palabraText = this.jsonDecodificado.questions[this.currentQuestion]?.palabraText[index];
    return !palabraText || palabraText.trim() === '';
  }

  previusQuestion() {
    this.currentQuestion--;
    this.getProgressPorcent();
  }

  selectedOption: any;
  selectOption(option: any) {
    if (!this.hasAnswered) {
      // Desmarcar la opción previamente seleccionada (si hay alguna)
      if (this.selectedOption) {
        this.selectedOption.selected = false;
      }

      // Marcar la nueva opción como seleccionada
      option.selected = true;
      this.selectedOption = option;
    }
  }


  startCounter() {
    this.qscli = false;
    this.interval$ = interval(1500)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.nextQuestion();
          this.getProgressPorcent();
          this.counter = 300;
          this.points -= 0;
          if (this.currentQuestion === this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 300;
    this.startCounter();
  }

  resetQuiz() {
    //this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 300;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPorcent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  updateProgress() {
    if (this.currentQuestion >= this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
  }

  endQuiz() {
    console.log("palabras consultadas",this.consultedWords)
    if (this.selectedOption) {
      // Verificar si la opción seleccionada es la correcta
      if (this.selectedOption.correct) {
        this.correctAnswer++;
        this.points=this.points+4;
      } else {
        this.inCorrectAnswer++;
      }
    } else {
      // En caso de que no se haya seleccionado ninguna opción
      this.inCorrectAnswer++;
    }
    this.selectedOption = null;
    console.log("Correctas:",this.correctAnswer)
    console.log("incorrectas:",this.inCorrectAnswer)
    this.isQuizCompleted = true;
    this.malas=5-this.correctAnswer;
    this.interaccion[0].cantidadCorrectas = this.correctAnswer;
    this.interaccion[0].cantidadIorrectas = this.malas;
    this.interaccion[0].cantidadPuntos = this.points;
    this.generateJSON();
  }



  completarActividad() {
    console.log("Enviando array de consultedword:", this.consultedWords)
    const studentId =  this.sharedService.getStudentId();
    const activityId = this.sharedService.getStoryActivityId();
    console.log("id de la actividad:", activityId)
    console.log("id del estudiante:", studentId)

    const consultedWords = this.consultedWords
    const contenidoTransformadoB64 = this.codifB64(consultedWords);
    console.log("b64:", contenidoTransformadoB64)

    const studentActivityData: StudentActivity = {
      studentId: studentId,
      activityId: activityId,
      correctAnswer: this.points,
      consultedWord: contenidoTransformadoB64,
    };

    console.log("datos completos:", studentActivityData)
    console.log("rara cosa:", studentActivityData.consultedWord)

    this.studentService.completeActivity(studentId, activityId, studentActivityData)
      .subscribe(
        completedActivity => {
          // Maneja la respuesta aquí si es necesarioa
          console.log('Actividad completada:', completedActivity);

        },
        error => {
          // Maneja errores aquí si es necesario
          console.error('Error al completar la actividad:', error);
        }
      );
  }


  hideButton1: boolean = false;
  hideButton2: boolean = false;


  codifB64(consultedWords: { palabra: string, consultCount: number }[]): string {
    // Convertir el array a una cadena JSON
    const contenidoTransformadoJSON = JSON.stringify(consultedWords);

    // Codificar la cadena JSON en base64
    const contenidoTransformadoB64 = btoa(contenidoTransformadoJSON);

    // Devolver la cadena base64 resultante
    return contenidoTransformadoB64;
  }



}
