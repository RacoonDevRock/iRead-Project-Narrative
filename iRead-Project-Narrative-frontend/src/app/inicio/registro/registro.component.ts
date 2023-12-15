import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  token="";
  constructor( private http: HttpClient ) {
  }

  ngOnInit (){




  }

}
