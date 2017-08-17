import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {db} from 'baqend';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isLoggedIn: Observable<boolean>;
    iscomp: boolean;

    constructor(private router: Router, public authService: AuthService) {
        this.isLoggedIn = authService.isLoggedIn();
    }

    logout() {
        db.User.logout().then(() => {
            this.authService.isLoginSubject.next(false);
            this.router.navigate(['/login']);
        })
    }

}
