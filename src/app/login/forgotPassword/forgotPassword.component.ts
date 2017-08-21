import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db} from 'baqend';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

    username;
    result = {
        isError: false,
        message: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['email'];
    }

    resetPassword() {
        db.User.resetPassword(this.username).then(
            () => {
                this.result.isError = false;
                this.result.message = 'Es wurde eine Nachricht an Ihre Mail-Adresse gesendet.';
            },
            (error) => {
                this.result.isError = true;
                this.result.message = 'Die Email konnte nicht gesendet werden.' + ' ' + error.message;
            }
        );
    }
}
