import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './_services/auth.service';
import {db} from 'baqend';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isLoggedIn: Observable<boolean>;
    isCompany: Observable<boolean>;
    isConfigCompleted: Observable<boolean>;

    constructor(private router: Router, public authService: AuthService) {
        this.isLoggedIn = authService.isLoggedIn();
        this.isCompany = authService.isCompany();
        this.isConfigCompleted = authService.isConfigComplete();
    }

    logout() {
        db.User.logout().then(() => {
            this.authService.isLoginSubject.next(false);
            this.authService.isCompSubject.next(false);
            this.authService.isConfigCompleteSubject.next(false);
            this.router.navigate(['/login']);
        })
    }

}
