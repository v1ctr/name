import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {baqend, db} from 'baqend';

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
