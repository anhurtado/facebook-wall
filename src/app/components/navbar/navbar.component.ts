import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public email: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLogin = false;
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.email = auth.email;
      } else {
        this.isLogin = false;
      }
    });
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
