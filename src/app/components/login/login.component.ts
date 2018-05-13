import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private router: Router,
    private messageService: FlashMessagesService
  ) {}

  loginUser() {
    this.authService.login(this.email, this.password)
      .then(res => {
        console.log('Usuario autenticado con éxito');
        console.log(res);
        this.messageService.show('Datos correctos', {cssClass:'alert-success', timeout:4000});
        this.router.navigate(['/wall']);
      }).catch(err => {
        console.log(err);
        this.messageService.show(err.message, {cssClass:'alert-danger', timeout:4000});
      });
  }
}
