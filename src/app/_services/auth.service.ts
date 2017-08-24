import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {db, model} from 'baqend';
import {Router} from '@angular/router';
import {LoggerService} from '../logging/logger.service';

@Injectable()
export class AuthService {

    private isLoginSubject = new BehaviorSubject<boolean>(false);
    private isCompSubject = new BehaviorSubject<boolean>(false);
    private isConfigCompleteSubject = new BehaviorSubject<boolean>(false);

    constructor(private router: Router, private logService: LoggerService) {
        db.ready().then(() => {
            if (!db.User.me) {
                this.isLoginSubject.next(false);
                this.isCompSubject.next(false);
                this.isConfigCompleteSubject.next(false);
            } else {
                this.isLoginSubject.next(true);
                this.isCompSubject.next(db.User.me.iscomp);
                this.isConfigCompleteSubject.next(db.User.me.isConfigCompleted);
            }
        });
    }

    public isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    public isCompany(): Observable<boolean> {
        return this.isCompSubject.asObservable();
    }

    public isConfigComplete(): Observable<boolean> {
        return this.isConfigCompleteSubject.asObservable();
    }

    public register(user, password) {
        db.User.register(user, password).then(() => {
            // @todo: nach der Mail-Bestätigung muss der LoginStatus evtl geupdated werden
            this.logService.logHint('Eine Nachricht mit einem Bestätigungs-Link wurde an die angegebene Adresse gesendet.');
        }, (error) => {
            this.logService.logError(error.message);
        });
    }

    public logIn(username, password) {
        db.User.login(username, password).then(() => {
            // Alle Komponenten über login informieren
            this.updateStatus(true, db.User.me.iscomp, db.User.me.isConfigCompleted);
        }, (error) => {
            this.logService.logError(error.message);
        });
    }

    public logout() {
        db.User.logout().then(() => {
            this.updateStatus(false, false, false);
            this.router.navigate(['/login']);
        })
    }

    public resetPassword(username) {
        db.User.resetPassword(username).then(
            () => {
                this.logService.logHint('Es wurde eine Nachricht an Ihre Mail-Adresse gesendet.');
            },
            (error) => {
                this.logService.logError('Die Email konnte nicht gesendet werden.' + ' ' + error.message);
            }
        );
    }

    public setNewPassword(token, password) {
        db.User.newPassword(token, password).then(
            () => {
                // Alle Komponenten über login informieren
                this.updateStatus(true, db.User.me.iscomp, db.User.me.isConfigCompleted);
                this.router.navigate([getRedirectPath()]);
            },
            (error) => {
                this.logService.logError(error.message);
            }
        );
    }

    public newPassword(username, oldPassword, newPassword) {
        db.User.newPassword(username, oldPassword, newPassword).then(() => {
                this.logService.logHint('Das Passwort wurde erfolgreich geändert.');
            },
            (error) => {
                this.logService.logError(error.message);
            }
        );
    }

    public signout() {
        db.User.logout().then(() => {
            this.updateStatus(false, false, false);
            this.router.navigate(['/signup']);
        });
    }

    public getOppositeRole(): Promise<model.Role> {
        let oppositeRoleName: string;
        if (this.isCompany()) {
            oppositeRoleName = 'bewerber';
        } else {
            oppositeRoleName = 'company';
        }
        return db.Role.find().equal('name', oppositeRoleName).singleResult();
    }

    public setNextUserConfigStep() {
        db.User.me.isConfigCompleted = true;
        db.User.me.save().then(() => {
            // this.logService.logHint('Sie können nun mit dem Swipen beginnen!');
            // this.logService.logHint('Sie können nun Stellenangebote anlegen!');
            this.isConfigCompleteSubject.next(true);
        }, (error) => {
            this.logService.logError('Fehler beim Speichern: ' + error.message);
        });
    }

    private updateStatus(loggedIn, isCompany, isConfigCompleted) {
        this.isLoginSubject.next(loggedIn);
        this.isCompSubject.next(isCompany);
        this.isConfigCompleteSubject.next(isConfigCompleted);
        this.router.navigate([getRedirectPath()]);
    }
}

/**
 * This method returns the correct redirect path based on the state of the current user's config and type.
 * Users who haven't finished filling out their profile for example can't swipe yet.
 * This method is used for example after the login when the user is redirected to the correct site,
 * but also when a user tries to open a link which he is not allowed to follow and a guard has to redirect the user.
 *
 * @param {string} userType
 * @param {string} module
 * @returns {string}
 */
export function getRedirectPath(userType: string = null, module: string = null): string {
    if (!db.User.me) {
        return '/login';
    }
    if (userType === null) {
        userType = db.User.me.iscomp ? 'unternehmen' : 'bewerber';
    }
    if (module === null) {
        module = db.User.me.isConfigCompleted ? 'swipe' : 'config';
    }
    return '/' + module + '/' + userType;
}
