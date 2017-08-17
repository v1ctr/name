import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { model, db } from 'baqend';
import { AuthService } from '../auth.service';
import {forEach} from "@angular/router/src/utils/collection";

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
        db.Stellenangebot.find().equal('unternehmen', unternehmen).resultList((stellenangebote) => {
          stellenangebote.forEach((angebot) => {
            angebot.delete();
          })
        })

        db.UnternehmenLikes.find().equal('unternehmen', unternehmen).resultList((likes) => {
          likes.forEach((like) => {
            like.delete();
          })
        })

        db.Match.find().equal('unternehmen', unternehmen).resultList((matchs) => {
          matchs.forEach((match) => {
            match.delete();
          })
        })

        unternehmen.delete();
      });
    } else {
      db.Bewerber.find().equal('userid', db.User.me.id).singleResult((bewerber) => {
        db.BewerberLikes.find().equal('bewerbee', bewerber).resultList((likes) => {
          likes.forEach((like) => {
            like.delete();
          })
        })

        db.Match.find().equal('bewerber', bewerber).resultList((matchs) => {
          matchs.forEach((match) => {
            match.delete();
          })
        })

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
