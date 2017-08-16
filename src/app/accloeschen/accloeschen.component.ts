import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';
import { AuthService } from '../auth.service';

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

  constructor(private router: Router , public authService : AuthService) {
    if (db.User.me) {
      this.router.navigate(['/accloeschen']);
    }
  }

  delete() {
    db.User.me.delete();
    db.User.logout().then(() => {
      this.authService.isLoginSubject.next(false);
      this.router.navigate(['/']);
    })
  }
}
