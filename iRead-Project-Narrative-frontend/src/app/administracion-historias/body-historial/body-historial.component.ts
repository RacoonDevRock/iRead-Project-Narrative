import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { StoriesService } from '../../services/stories.service';
import { StoryDTO } from '../../Modelo/StoryDTO';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-body-historial',
  templateUrl: './body-historial.component.html',
  styleUrls: ['./body-historial.component.css']
})
export class BodyHistorialComponent implements OnInit {

  stories: StoryDTO[] = [];
  public filtro: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private storiesService: StoriesService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
  ) {

  }


  ngOnInit() {

    // Obtener el ID del profesor desde el servicio de autenticación
    const teacherId = this.authService.getCurrentTeacherId();
    console.log('id del docente:', teacherId);
    if (teacherId !== null) {
      // Llamar al servicio para obtener las historias del profesor

      this.storiesService.getStoriesByTeacherId(teacherId).subscribe(
        (stories) => {
          console.log('Historias obtenidas exitosamente:', stories);
          console.log('Historias obtenidas exitosamente:', stories.length);
          // Asigna los datos al arreglo 'stories'
          this.stories = stories;
          if(this.stories.length===0){
            this.filtro=false;
            console.log('estado:', this.filtro);

          } else {
            this.filtro=true;
            console.log('estado:', this.filtro);
          }
        },
        (error) => {
          console.error('Error al obtener historias:', error);
          // Manejar el error según tus necesidades
        }
      );

    } else {
      console.error('No se pudo obtener el ID del profesor.');
      // Manejar el error según tus necesidades
    }
  }

  transformarFecha(fecha: string): string {
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return fechaFormateada;
  }

  onFiltroChange(event: any) {
    const filtroSeleccionado = event.target.value;

    if (filtroSeleccionado === 'Alfabeticamente') {
      // Ordenar alfabéticamente por el título de la historia
      this.stories.sort((a: any, b: any) => a.title.localeCompare(b.title));
    } else if (filtroSeleccionado === 'Mas recientes') {
      // Ordenar por la fecha de creación de forma descendente (los más recientes primero)
      this.stories.sort((a: any, b: any) => {
        const dateA = new Date(a.dateCreation).getTime();
        const dateB = new Date(b.dateCreation).getTime();
        return dateB - dateA;
      });
    } else {
      // Si se selecciona "Seleccionar filtro" o cualquier otro caso, restaurar la lista a su estado original
      this.ngOnInit();
    }
  }

  iniciarHistoria(story: StoryDTO) {
    // Almacena la historia seleccionada en el servicio compartido
    this.sharedService.setSelectedStory(story);

    // Redirige a la página de inicio de la historia
    this.router.navigate(['/iniciar']);
  }


}
