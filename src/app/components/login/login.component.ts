import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser() {
    this.authService.login(this.email, this.password)
      .then(res => {
        console.log('Usuario autenticado con éxito');
        console.log(res);
        this.router.navigate(['/wall']);
      }).catch(err => {
        console.log(err);
      });
  }
}
