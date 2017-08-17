import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {db} from 'baqend';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    user = {
        username: '',
        password: '',
    };
    error;

    constructor(private router: Router, public authService: AuthService) {
    }

    logIn() {
        db.User.login(this.user.username, this.user.password).then(() => {
            // Alle Komponenten über login informieren
            this.authService.isLoginSubject.next(true);
            this.authService.isCompSubject.next(db.User.me.iscomp);
            this.authService.isConfigCompleteSubject.next(db.User.me.isConfigCompleted);
            const module = db.User.me.isConfigCompleted ? '/swipe' : '/config';
            const type = db.User.me.iscomp ? '/unternehmen' : '/bewerber';
            this.router.navigate([module + type]);
        }, (error) => {
            this.error = error.message;
        });
    }
}
