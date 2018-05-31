import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public loggedIn: boolean;
  public email: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getAuth().subscribe(
      data => {
        if (data && data.uid) {
          this.loggedIn = true;
          this.email = data.email;
        } else {
          this.loggedIn = false;
        }
      },
      error => this.loggedIn = false
    );
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
