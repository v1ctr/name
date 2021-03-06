import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NavigationEnd, Router} from '@angular/router';

/**
 * Dieser Service verwaltet global die Meldungen/Fehler, die dem Benutzer angezeigt werden.
 * (Zum Beispiel erfolgreiches Speichern, falsche Passworteingabe, etc.)
 */
@Injectable()
export class LoggerService {

    private errors: BehaviorSubject<string[]> = new BehaviorSubject([]);
    private hints: BehaviorSubject<string[]> = new BehaviorSubject([]);

    /**
     * Um angezeigte Fehler/Meldungen beim Laden einer neuen Seite wieder zu löschen,
     * subscribed sich der Service auf das NavigationEnd-Event des Routers.
     *
     * @param {Router} router
     */
    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.reset();
            }
        });
    }

    public logError(message: string): void {
        const errorList = this.errors.getValue();
        errorList.push(message);
        this.errors.next(errorList);
    }

    public logHint(message: string) {
        // hint signals success --> therefore assuming that all previous errors have been resolved
        this.resetErrors();
        const hintList = this.hints.getValue();
        hintList.push(message);
        this.hints.next(hintList);
    }

    public getErrors(): Observable<string[]> {
        return this.errors.asObservable();
    }

    public getHints(): Observable<string[]> {
        return this.hints.asObservable();
    }

    private reset(): void {
        this.resetErrors();
        this.resetHints();
    }

    private resetHints() {
        this.hints.next([]);
    }

    private resetErrors() {
        this.errors.next([]);
    }
}
