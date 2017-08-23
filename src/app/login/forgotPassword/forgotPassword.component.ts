import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {db} from 'baqend';
import {LoggerService} from '../../logging/logger.service';

@Component({
    templateUrl: './forgotPassword.component.html',
})
export class ForgotPasswordComponent implements OnInit {

    public username;

    constructor(private route: ActivatedRoute, private logService: LoggerService) {
    }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['email'];
    }

    resetPassword() {
        db.User.resetPassword(this.username).then(
            () => {
                this.logService.logHint('Es wurde eine Nachricht an Ihre Mail-Adresse gesendet.');
            },
            (error) => {
                this.logService.logError('Die Email konnte nicht gesendet werden.' + ' ' + error.message);
            }
        );
    }
}
