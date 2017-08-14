import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {db} from 'baqend';

@Injectable()
export class AuthService{
  isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(){
    db.ready().then(() => {
      if (!db.User.me) {
        this.isLoginSubject.next(false);
      }else{
        this.isLoginSubject.next(true);
      }
      console.log("construct-ngOnInit");
      console.log(this.isLoginSubject.getValue());
    });
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

}
