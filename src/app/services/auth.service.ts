import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private authService: AngularFireAuth) {
    this.getAuth();
  }

  login(email: string, pass: string) {
    return this.authService.auth.signInWithEmailAndPassword(email, pass);
  }

  register(email: string, pass: string) {
    return this.authService.auth.createUserWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.authService.auth.signOut();
  }

  getAuth() {
    return this.authService.authState;
  }
}
