import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { db } from 'baqend';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  user = {
    username: '',
    password: ''
  };
  error;

  constructor(private router: Router) {
    if (db.User.me) {
      this.router.navigate(['/signup/me']);
    }
  }

  register() {
    db.User.register(this.user.username, this.user.password).then(() => {
      this.router.navigate(['/config']);
    }, (error) => {
      this.error = error.message;
    });
  }

  logIn() {
    db.User.login(this.user.username, this.user.password).then(() => {
      this.router.navigate(['/config']);
    }, (error) => {
      this.error = error.message;
    });
  }
}
