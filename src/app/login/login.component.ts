import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {db} from 'baqend';
import {getRedirectPath} from "../db";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {

    user = {
        username: '',
        password: '',
    };
    error;

    constructor(private router: Router, public authService: AuthService) {
    }

    logIn() {
        db.User.login(this.user.username, this.user.password).then(() => {
            // Alle Komponenten über login informieren
            this.authService.isLoginSubject.next(true);
            this.authService.isCompSubject.next(db.User.me.iscomp);
            this.authService.isConfigCompleteSubject.next(db.User.me.isConfigCompleted);
            this.router.navigate([getRedirectPath()]);
        }, (error) => {
            this.error = error.message;
        });
    }
}
