import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-config-unternehmen',
  templateUrl: './config-unternehmen.component.html',
  styleUrls: ['./config-unternehmen.component.scss']
})
export class ConfigUnternehmenComponent implements OnInit {

  user: model.User;

  error;

  constructor(private router: Router) {
    if (!db.User.me.iscomp) {
      this.router.navigate(['/config/bewerber']);
    }
  }

  ngOnInit() {
    this.user = db.User.me;
  }

  save() {
    this.user.update();
  }
}
