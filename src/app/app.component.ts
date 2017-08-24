import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './_services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    /**
     * Diese Observables steuern die Anzeige der verfügbaren Links im Menü
     */
    public isLoggedIn: Observable<boolean>;
    public isCompany: Observable<boolean>;
    public isConfigCompleted: Observable<boolean>;

    constructor(private authService: AuthService) {
        this.isLoggedIn = authService.isLoggedIn();
        this.isCompany = authService.isCompany();
        this.isConfigCompleted = authService.isConfigComplete();
    }

    logout() {
        this.authService.logout();
    }

}
