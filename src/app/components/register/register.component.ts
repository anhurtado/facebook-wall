import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  registerUser() {
    this.authService.register(this.email, this.password)
      .then(res => {
        console.log('Usuario creado con éxito');
        console.log(res);
        this.router.navigate(['/wall']);
      }).catch(err => {
        console.log(err);
      });
  }
}
