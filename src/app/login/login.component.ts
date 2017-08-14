import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import {db} from 'baqend';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  user = {
    username: '',
    password: '',
    iscomp: false
  };
  error;

  constructor(private router: Router, public authService : AuthService ) {
    if (db.User.me) {
      this.router.navigate(['/signup/me']);
    }
  }

  logIn() {
    db.User.login(this.user.username, this.user.password).then(() => {
      //Alle Komponenten über login informieren
      this.authService.isLoginSubject.next(true);
      if (db.User.me.iscomp) {
        this.router.navigate(['/config/unternehmen']);
      }
      else {
        this.router.navigate(['/config/bewerber']);
      }
    }, (error) => {
      this.error = error.message;
    });
  }
}
