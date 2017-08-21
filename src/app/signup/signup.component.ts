import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db} from 'baqend';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    user = {
        username: '',
        password: '',
        passwordRepeat: '',
        iscomp: false,
    };
    result = {
        isError: false,
        message: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {
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
                this.result.isError = false;
                this.result.message = 'Eine Nachricht mit einem Bestätigungs-Link wurde an die angegebene Adresse gesendet.';
            }, (error) => {
                this.result.isError = true;
                this.result.message = error.message;
            });
        } else {
            this.result.isError = true;
            this.result.message = 'Passwörter stimmen nicht überein!';
        }
    }
}
