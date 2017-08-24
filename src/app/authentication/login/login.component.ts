import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';


@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {

    public user = {
        username: '',
        password: '',
    };

    constructor(private authService: AuthService) {
    }

    logIn() {
        this.authService.logIn(this.user.username, this.user.password);
    }
}
