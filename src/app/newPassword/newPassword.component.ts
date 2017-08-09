import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db} from 'baqend';

@Component({
    selector: 'app-new-password',
    templateUrl: './newPassword.component.html',
})
export class NewPasswordComponent {

    password;
    error;

    constructor(private router: Router) {

    }

    setNewPassword() {
        const paramName = 'bq-token='; // Default token parameter
        const search = location.search;
        const token = search.substring(search.indexOf(paramName) + paramName.length);
        db.User.newPassword(token, this.password).then(
            () => {
                this.router.navigate(['/config'])
            },
            (error) => this.error = error.message
        );
    }
}
