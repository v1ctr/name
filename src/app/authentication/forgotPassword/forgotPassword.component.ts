import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../_services/auth.service';


@Component({
    templateUrl: './forgotPassword.component.html',
})
export class ForgotPasswordComponent {

    public username;

    constructor(private route: ActivatedRoute, private authService: AuthService) {
        this.username = this.route.snapshot.params['email'];
    }

    resetPassword() {
        this.authService.resetPassword(this.username);
    }
}
