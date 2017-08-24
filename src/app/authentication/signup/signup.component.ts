import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {db} from 'baqend';
import {LoggerService} from '../../logging/logger.service';
import {AuthService} from '../../_services/auth.service';

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

    constructor(private route: ActivatedRoute, private logService: LoggerService, private authService: AuthService) {
        this.user.username = this.route.snapshot.params['email'];
    }

    register() {
        if (this.user.password === this.user.passwordRepeat) {
            const user = new db.User({
                username: this.user.username,
                iscomp: this.user.iscomp,
                isConfigCompleted: false,
            });
            this.authService.register(user, this.user.password);
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }
}
