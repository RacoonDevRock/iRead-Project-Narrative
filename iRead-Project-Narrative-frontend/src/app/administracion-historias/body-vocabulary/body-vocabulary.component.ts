import { Component } from '@angular/core';

@Component({
  selector: 'app-body-vocabulary',
  templateUrl: './body-vocabulary.component.html',
  styleUrls: ['./body-vocabulary.component.css']
})
export class BodyVocabularyComponent {

  vocabularys = [
    {
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      palabraText: "",
      significado: "",
      casouso: ""
    },
    {
      palabraText: "",
      significado: "",
      casouso: ""
    },
  ];

  page: number = 1;
  nextpage() {
    this.page++;
  }

  prevpage() {
    this.page--;
  }

  submitForm(index: number) {
    console.log('Datos del formulario(Vocabulario):', this.vocabularys[index]);
  }
  generateJSON() {
    // Construir el objeto JSON deseado
    const jsonVocavularys = this.vocabularys.map((vocabulary) => {
      return {
        palabraText: vocabulary.palabraText,
        significado: vocabulary.significado,
        casouso: vocabulary.casouso,
      };
    });

    const jsonData = {
      vocabularys: jsonVocavularys,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }
}
