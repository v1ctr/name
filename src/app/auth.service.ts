import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {db} from 'baqend';

@Injectable()
export class AuthService {
    isLoginSubject = new BehaviorSubject<boolean>(false);
    isCompSubject = new BehaviorSubject<boolean>(false);
    isConfigCompleteSubject = new BehaviorSubject<boolean>(false);

    constructor() {
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


    /**
     *
     * @returns {Observable<T>}
     */
    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    isCompany(): Observable<boolean> {
        return this.isCompSubject.asObservable();
    }

    isConfigComplete(): Observable<boolean> {
        return this.isConfigCompleteSubject.asObservable();
    }
}
