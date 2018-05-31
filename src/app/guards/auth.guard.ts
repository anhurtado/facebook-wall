import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.getAuth().subscribe(
      data => this.loggedIn = (data && data.uid) ? true : false,
      error => this.loggedIn = false
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    }
    return this.loggedIn;
  }
}
