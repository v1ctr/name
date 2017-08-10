import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-bewerberprofil',
  templateUrl: './bprofil.component.html',
  styleUrls: ['./bprofil.component.scss']
})
export class BewerberprofilComponent implements OnInit {

  user: model.User;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.user = db.User.me;
  }

}
