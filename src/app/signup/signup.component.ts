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
        iscomp: false,
    };
    result = {
        isError: false,
        message: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.user.username = params['email'];
        });
    }

    register() {
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
    }
}
