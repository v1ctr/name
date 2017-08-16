import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { model, db } from 'baqend';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-accloeschen',
  templateUrl: './accloeschen.component.html',
  styleUrls: ['./accloeschen.component.scss']
})
export class AccloeschenComponent implements OnInit {

  me: model.User;

  constructor(private router: Router, public authService : AuthService) {
    if (db.User.me) {
      this.router.navigate(['/accloeschen']);
    }
  }

  ngOnInit() {
    this.me = db.User.me;
  }

  delete() {
    db.User.me.delete();
    db.User.logout().then(() => {
      this.authService.isLoginSubject.next(false);
      this.router.navigate(['/']);
    })
  }
}
