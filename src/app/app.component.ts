import { Component } from '@angular/core';
import {db} from 'baqend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedIn: boolean;

  constructor(){
    this.loggedIn = false;
    db.ready().then(() => {
      if (db.User.me) {
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    });
  }

}
