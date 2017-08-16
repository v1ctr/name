import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';

@Component({
  selector: 'app-accloeschen',
  templateUrl: './accloeschen.component.html',
  styleUrls: ['./accloeschen.component.scss']
})
export class AccloeschenComponent {

  user = {
    username: '',
    password: '',
    iscomp: false
  };
  result = {
    isError: false,
    message: '',
  };

  constructor(private router: Router) {
    if (db.User.me) {
      this.router.navigate(['/accloeschen']);
    }
  }

  logIn() {
    db.User.delete(this.user.username, this.user.password).then(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.error = error.message;
    });
  }
}
