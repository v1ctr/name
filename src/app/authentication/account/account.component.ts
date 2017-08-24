import {Component} from '@angular/core';
import {db} from 'baqend';
import {AuthService} from '../../_services/auth.service';
import {LoggerService} from '../../logging/logger.service';

@Component({
    templateUrl: './account.component.html',
})
export class AccountComponent {

    public username: string;
    public oldPassword;
    public newPassword;
    public newPasswordRepeat;


    constructor(private authService: AuthService, private logService: LoggerService) {
        this.username = db.User.me.username;
    }

    setNewPassword() {
        if (this.newPasswordRepeat === this.newPassword) {
            this.authService.newPassword(this.username, this.oldPassword, this.newPassword);
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }

    deleteUser() {
        this.authService.signout();
    }
}
