import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db} from 'baqend';

@Component({
    selector: 'app-change-password',
    templateUrl: './changepass.component.html',
    styleUrls: ['./changepass.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

    username;
    result = {
        isError: false,
        message: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['email'];
        });
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
