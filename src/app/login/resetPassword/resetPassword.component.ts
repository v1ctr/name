import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';
import {getRedirectPath} from '../../db';
import {LoggerService} from '../../logging/logger.service';
import {AuthService} from '../../_services/auth.service';

@Component({
    templateUrl: './resetPassword.component.html',
})
export class ResetPasswordComponent {

    public password;
    public passwordRepeat;

    constructor(private router: Router, private logService: LoggerService, private authService: AuthService) {
    }

    setNewPassword() {
        if (this.passwordRepeat === this.password) {
            const paramName = 'bq-token='; // Default token parameter
            const search = location.search;
            const token = search.substring(search.indexOf(paramName) + paramName.length);
            db.User.newPassword(token, this.password).then(
                () => {
                    // Alle Komponenten über login informieren
                    this.authService.isLoginSubject.next(true);
                    this.authService.isCompSubject.next(db.User.me.iscomp);
                    this.authService.isConfigCompleteSubject.next(db.User.me.isConfigCompleted);
                    this.router.navigate([getRedirectPath()]);
                },
                (error) => {
                    this.logService.logError(error.message);
                }
            );
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }
}
