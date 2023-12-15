import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Agrega la importación de 'map'
import { of } from 'rxjs';
import { Teacher} from "../Modelo/Teacher";
import {environments} from "../../environments/environments";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = environments.baseUrl;


  constructor(private httpClient: HttpClient) { }

  register(teacher:Teacher): Observable<Teacher> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.url}/api/auth/register`;
    return this.httpClient.post<Teacher>(url, teacher, {headers});
  }

  authenticate(credentials?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (credentials) {
      const url = `${this.url}/api/auth/authenticate`;
      return this.httpClient.post<any>(url, credentials, {headers})
        .pipe(
          map(response => {
            return response; // Devuelve la respuesta completa, incluido el id
          })
        );
    } else {
      const token = localStorage.getItem('token');
      return of({ token }); // Devuelve un objeto con la propiedad 'token'
    }

  }


  isAuthenticated(): boolean {
    // Lógica para verificar la autenticación, por ejemplo, verificar la existencia del token en localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }

  getCurrentTeacherId(): number | null {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));

      return tokenData.teacherId;
    }

    return null;
  }

}
