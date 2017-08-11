import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-config-bewerber',
  templateUrl: './config-bewerber.component.html',
  styleUrls: ['./config-bewerber.component.scss']
})
export class ConfigBewerberComponent implements OnInit {

  user: model.User;
    bewerber: model.Bewerber;

  error;

  constructor(private router: Router) {
    if (db.User.me.iscomp) {
      this.router.navigate(['/config/unternehmen']);
    }
  }

  ngOnInit() {
    this.user = db.User.me;
      db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
          if (bewerber) {
              this.bewerber = bewerber;
          } else {
              this.bewerber = new db.Bewerber();
          }
      });
  }

  save() {
      this.user.save();
  }
}
