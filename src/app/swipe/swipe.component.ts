import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit {

  user: model.User;
  error;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.user = db.User.me;
  }

}
