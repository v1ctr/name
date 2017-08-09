import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { db } from 'baqend';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = {
    username: '',
    password: '',
    iscomp: false
  };
  error;

  constructor(private router: Router) {
    if (db.User.me) {
      this.router.navigate(['/signup/me']);
    }
  }

  logIn() {
    db.User.login(this.user.username, this.user.password).then(() => {
      this.router.navigate(['/config']);
    }, (error) => {
      this.error = error.message;
    });
  }
}
