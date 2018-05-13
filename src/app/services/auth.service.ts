import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(public authService: AngularFireAuth) { }

  login(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.auth.signInWithEmailAndPassword(email, pass)
        .then(
          data => resolve(data),
          err => reject(err)
        );
    });
  }

  register(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.auth.createUserWithEmailAndPassword(email, pass)
        .then(
          data => resolve(data),
          err => reject(err)
        );
    });
  }

  logout() {
    return this.authService.auth.signOut();
  }

  getAuth() {
    return this.authService.authState.map(auth => auth);
  }
}
