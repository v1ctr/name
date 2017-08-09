import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent {

    username = '';
    result = {
        isError: false,
        message: '',
    };

    constructor(private router: Router) {

    }

    resetPassword() {
        db.User.resetPassword(this.username).then(
            () => {
                this.result.message = 'Es wurde eine Nachricht an Ihre Mail-Adresse gesendet.';
            },
            (error) => {
                this.result.isError = true;
                this.result.message = 'Die Email konnte nicht gesendet werden.';
            }
        );
    }
}
