import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private authservice: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}
  login() {
    this.authservice.login(this.model).subscribe(
      (next) => {
        console.log('Login success');
        this.alertify.success('Login success');
      },
      (error) => {
        console.log('Login Failed');
        this.alertify.error('Login Failed');
      },
      () => {
        this.router.navigate(['/member']);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged Out');
    this.alertify.message('logged Out');
    this.router.navigate(['/home']);
  }
}
