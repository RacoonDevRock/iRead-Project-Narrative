import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getResultadosJson() {
    return this.http.get<any>('assets/resultados.json');
  }

  getTitautJson() {
    return this.http.get<any>('assets/titaut.json');
  }

}
