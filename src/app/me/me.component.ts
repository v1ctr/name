import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { model, db } from 'baqend';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  me: model.User;

  constructor(private router: Router, public authService : AuthService) {}

  ngOnInit() {
    this.me = db.User.me;
  }

  logout() {
    db.User.logout().then(() => {
      this.authService.isLoginSubject.next(false);
      this.router.navigate(['/']);
    })
  }
}
