import {Component} from '@angular/core';
import {LoggerService} from '../../logging/logger.service';
import {AuthService} from '../../_services/auth.service';

@Component({
    templateUrl: './resetPassword.component.html',
})
export class ResetPasswordComponent {

    public password;
    public passwordRepeat;

    constructor(private logService: LoggerService, private authService: AuthService) {
    }

    setNewPassword() {
        if (this.passwordRepeat === this.password) {
            const paramName = 'bq-token='; // Default token parameter
            const search = location.search;
            const token = search.substring(search.indexOf(paramName) + paramName.length);
            this.authService.setNewPassword(token, this.password);
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }
}
