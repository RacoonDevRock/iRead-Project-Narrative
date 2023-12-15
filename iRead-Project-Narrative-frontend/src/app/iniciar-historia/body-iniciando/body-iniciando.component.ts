import { Component, OnInit} from '@angular/core';
import { StoriesService} from "../../services/stories.service";
import { StoryDTO } from '../../Modelo/StoryDTO';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";




@Component({
  selector: 'app-body-iniciando',
  templateUrl: './body-iniciando.component.html',
  styleUrls: ['./body-iniciando.component.css']
})
export class BodyIniciandoComponent implements OnInit{

  selectedStory: StoryDTO | null = null;
  private subscription: Subscription;
  idStory:number | undefined =0;
  nombreStory:string| undefined ="";


  constructor(private storiesService: StoriesService, private sharedService:SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Desuscribe la suscripción anterior si existe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Suscribe al cambio de parámetros de la URL para obtener la historia seleccionada
    this.subscription = this.sharedService.selectedStory.subscribe((story) => {
      this.selectedStory = story;
      this.idStory = this.selectedStory?.id;
      this.nombreStory = this.selectedStory?.title
      console.log('datos obtenidos2:', this.selectedStory);
      console.log('Esta es la idStory:', this.idStory);
      console.log('nombre de la Story:', this.nombreStory);
     this.sharedService.setActivityId(this.idStory);
     this.sharedService.setNombreAc(this.nombreStory)
    });
  }

  ngOnDestroy() {
    // Desuscribe la suscripción al destruir el componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  comenzarHistoria() {
    if (this.idStory) {
      this.storiesService.activateStory(this.idStory).subscribe(
        (response: any) => {
          console.log('Historia activada:', response);
          // Puedes realizar acciones adicionales después de activar la historia.
        },
        (error: HttpErrorResponse) => {
          console.error('Error al activar la historia', error);
          // Manejo de errores si es necesario.
        }
      );
    }
  }

}
