import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';
import {getRedirectPath} from '../../db';

@Component({
    selector: 'app-new-password',
    templateUrl: './newPassword.component.html',
})
export class NewPasswordComponent {

    password;
    passwordRepeat;
    error;

    constructor(private router: Router) {

    }

    setNewPassword() {
        if (this.passwordRepeat === this.password) {
            const paramName = 'bq-token='; // Default token parameter
            const search = location.search;
            const token = search.substring(search.indexOf(paramName) + paramName.length);
            db.User.newPassword(token, this.password).then(
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
