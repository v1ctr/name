import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {db} from 'baqend';
import {getRedirectPath} from '../db';
import {LoggerService} from '../logging/logger.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {

    public user = {
        username: '',
        password: '',
    };

    constructor(private router: Router, private authService: AuthService, private logService: LoggerService) {
    }

    logIn() {
        db.User.login(this.user.username, this.user.password).then(() => {
            // Alle Komponenten über login informieren
            this.authService.isLoginSubject.next(true);
            this.authService.isCompSubject.next(db.User.me.iscomp);
            this.authService.isConfigCompleteSubject.next(db.User.me.isConfigCompleted);
            this.router.navigate([getRedirectPath()]);
        }, (error) => {
            this.logService.logError(error.message);
        });
    }
}
