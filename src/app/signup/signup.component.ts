import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {db} from 'baqend';
import {LoggerService} from '../logging/logger.service';

@Component({
    templateUrl: './signup.component.html',
})
export class SignupComponent {

    public user = {
        username: '',
        password: '',
        passwordRepeat: '',
        iscomp: false,
    };

    constructor(private route: ActivatedRoute, private logService: LoggerService) {
        this.user.username = this.route.snapshot.params['email'];
    }

    register() {
        if (this.user.password === this.user.passwordRepeat) {
            const user = new db.User({
                username: this.user.username,
                iscomp: this.user.iscomp,
                isConfigCompleted: false,
            });
            db.User.register(user, this.user.password).then(() => {
                this.logService.logHint('Eine Nachricht mit einem Bestätigungs-Link wurde an die angegebene Adresse gesendet.');
            }, (error) => {
                this.logService.logError(error.message);
            });
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }
}
