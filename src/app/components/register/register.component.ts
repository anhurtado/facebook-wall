import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;
  public registerForm: FormGroup;
  public formErrors: any = {
    'email': '',
    'password': ''
  };
  public validationMessages: any = {
    'email': {
      'required': 'El correo electrónico es requerido.',
      'email': 'El correo electrónico no es válido.'
    },
    'password': {
      'required': 'La contraseña es requerida.',
      'minlength': 'La contraseña debe ser mayor a 6 caracteres.',
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: FlashMessagesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

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

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      // Limpio los mensajes de error
      this.formErrors[field] = '';

      // Obtengo el control
      const control = form.get(field);

      // Recorro los errores
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
