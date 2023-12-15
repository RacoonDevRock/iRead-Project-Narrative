import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-body-login',
  templateUrl: './body-login.component.html',
  styleUrls: ['./body-login.component.css']
})
export class BodyLoginComponent {

  loginTeacherForm: FormGroup;

  constructor(private teacherService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginTeacherForm = this.fb.group({})
  }

  ngOnInit() {
    this.loginTeacherForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  login() {
    console.log(this.loginTeacherForm.value);
    this.teacherService.authenticate(this.loginTeacherForm.value).subscribe((res) => {
        console.log("esta es la resupesta:",res);
        if (res) {
          // Asegúrate de que res es verdadero (autenticación exitosa) antes de intentar acceder a res.token
          localStorage.setItem('token', res.token);
          this.router.navigate(['/crea']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
