import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {baqend, db} from 'baqend';
import {getRedirectPath} from './app-routing.module';

db.connect('green-meadow-83', true);

@Injectable()
export class DBReady implements Resolve<baqend> {
  resolve(route: ActivatedRouteSnapshot): Promise<baqend> {
    return db.ready();
  }
}

@Injectable()
export class DBLoggedIn implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return db.ready().then(() => {
      if (!db.User.me) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    });
  }
}

@Injectable()
export class DBNotLoggedIn implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (db.User.me) {
                this.router.navigate([getRedirectPath()]);
                return false;
            }
            return true;
        });
    }
}

@Injectable()
export class IsCompany implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (!db.User.me) {
                this.router.navigate(['/login']);
                return false;
            } else if (db.User.me.iscomp) {
                return true;
            }
            this.router.navigate([getRedirectPath('bewerber')]);
            return false;
        });
    }
}

@Injectable()
export class IsBewerber implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (!db.User.me) {
                this.router.navigate(['/login']);
                return false;
            } else if (!db.User.me.iscomp) {
                return true;
            }
            this.router.navigate([getRedirectPath('unternehmen')]);
            return false;
        });
    }
}

export const DB_PROVIDERS = [DBReady, DBLoggedIn, DBNotLoggedIn, IsCompany, IsBewerber];
