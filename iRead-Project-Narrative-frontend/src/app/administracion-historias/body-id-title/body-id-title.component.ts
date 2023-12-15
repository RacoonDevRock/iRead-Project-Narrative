import { Component, OnInit } from '@angular/core';
import { StoriesService } from "../../services/stories.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from "../../services/auth.service";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-body-id-title',
  templateUrl: './body-id-title.component.html',
  styleUrls: ['./body-id-title.component.css']
})
export class BodyIdTitleComponent implements OnInit {
  postStoryForm: FormGroup;
  StoryId=0;
  constructor(
    private storiesService: StoriesService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService // Agrega el servicio compartido
  ) {
    this.postStoryForm = this.fb.group({});
  }

  ngOnInit() {
    this.postStoryForm = this.fb.group({
      title: [null, [Validators.required]],
      accessWord: [null, [Validators.required]],
    });
  }

  crearHistoria() {
    // Obtener el ID del profesor desde el servicio de autenticación
    const teacherId = this.authService.getCurrentTeacherId();

    if (teacherId !== null) {
      // Crear la historia con el ID del profesor
      const newStory = { ...this.postStoryForm.value, teacherId };

      // Llamar al servicio para crear la historia
      this.storiesService.createStory(newStory).subscribe(
        (createdStory) => {
          console.log('Historia creada exitosamente:', createdStory);

          // Guardar la ID de la historia en el servicio compartido
          this.sharedService.setStoryId(createdStory.id);

          // Redirigir o realizar otras acciones después de crear la historia
          this.router.navigate(['/quiz']);
        },
        (error) => {
            console.error('Error al crear la historia:', error);
            window.alert("Campos invalidos o vacios")
          // Manejar el error según tus necesidades
        }
      );
    } else {
      console.error('No se pudo obtener el ID del profesor.');
      // Manejar el error según tus necesidades
    }
  }
}
