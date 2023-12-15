import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesService} from "../../services/stories.service";
import { SharedService } from "../../services/shared.service";
import {StoryDTO} from "../../Modelo/StoryDTO";

@Component({
  selector: 'app-body-progreso',
  templateUrl: './body-progreso.component.html',
  styleUrls: ['./body-progreso.component.css']
})
export class BodyProgresoComponent implements OnInit {

  selectedStory: StoryDTO | null = null;
  nombreAc: string| undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storiesService: StoriesService,
    private sharedServie: SharedService
  ) { }

  ngOnInit() {
    this.nombreAc=this.sharedServie.getNombreAc()
    // Obtén el storyId de los parámetros de la URL
    this.route.params.subscribe(params => {
      const storyId = +params['storyId'];
      // Hacer algo con el storyId si es necesario
    });
  }

  terminarYVerResultados() {

    const storyId = this.sharedServie.getActivityId()
    // Desactivar la historia usando el servicio
    this.storiesService.deactivateStory(storyId).subscribe(
      (response) => {
        console.log('Historia desactivada exitosamente en progreso:', response);
        // Puedes redirigir a la página de resultados o manejar la respuesta de otra manera
        this.router.navigateByUrl('/preterminar');

      },
      (error) => {
        console.error('Error al intentar desactivar la historia:', error);
        // Puedes manejar errores aquí si es necesario
      }
    );
  }
}
