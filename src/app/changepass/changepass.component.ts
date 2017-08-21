import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';
import {getRedirectPath} from '../db';

@Component({
    selector: 'app-change-password',
    templateUrl: './changepass.component.html',
})
export class ChangePasswordComponent {

    oldPassword;
    newPassword;
    newPasswordRepeat;
    error;

    constructor(private router: Router) {
    }

    setNewPassword() {
        if (this.newPasswordRepeat === this.newPassword) {
            db.User.newPassword(db.User.me.username, this.oldPassword, this.newPassword).then(
                () => {
                    this.router.navigate([getRedirectPath()]);
                },
                (error) => {
                    this.error = error.message;
                }
            );
        } else {
            this.error = 'Passwörter stimmen nicht überein!';
        }
    }
}
