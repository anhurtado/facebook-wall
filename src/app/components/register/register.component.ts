import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: FlashMessagesService
  ) {}

  registerUser() {
    this.authService.register(this.email, this.password)
      .then(res => {
        console.log('Usuario creado con éxito');
        console.log(res);
        this.messageService.show('Usuario creado con éxito', {cssClass:'alert-success', timeout:4000});
        this.router.navigate(['/wall']);
      }).catch(err => {
        console.log(err);
        this.messageService.show(err.message, {cssClass:'alert-danger', timeout:4000});
      });
  }
}
