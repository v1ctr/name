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
  bewerber: model.Bewerber;
  unternehmen: model.Unternehmen;

  constructor(private router: Router, public authService : AuthService) {
    if (db.User.me) {
      this.router.navigate(['/accloeschen']);
      this.me = db.User.me;
      this.bewerber = new db.Bewerber();
      this.unternehmen = new db.Unternehmen();
    }
  }

  ngOnInit() {
  }

  delete() {
    if (this.me.iscomp) {
      db.Unternehmen.find().equal('userid', db.User.me.id).singleResult((unternehmen) => {
        db.Stellenangebot.find().equal('unternehmen', db.Unternehmen.id).resultList((stellenangebote) => {

        });
        unternehmen.delete();
      });
    } else {
      db.Bewerber.find().equal('userid', db.User.me.id).singleResult((bewerber) => {
          bewerber.delete();
      });
    }
    db.User.me.delete();
    db.User.logout().then(() => {
      this.authService.isLoginSubject.next(false);
      this.router.navigate(['/']);
    })
  }
}
