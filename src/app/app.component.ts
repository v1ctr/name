import {Component} from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isLoggedIn : Observable<boolean>;
    iscomp: boolean;

    constructor( public authService : AuthService ) {
      this.isLoggedIn = authService.isLoggedIn();
    }

}
