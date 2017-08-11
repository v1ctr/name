import {Component} from '@angular/core';
import {db} from 'baqend';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loggedIn: boolean;
    iscomp: boolean;

    constructor() {
        this.loggedIn = false;
        db.ready().then(() => {
            if (db.User.me) {
                this.loggedIn = true;
                this.iscomp = db.User.me.iscomp;
            } else {
                this.loggedIn = false;
            }
        });
    }

}
