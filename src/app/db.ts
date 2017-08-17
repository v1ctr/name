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

@Injectable()
export class ConfigCompleted implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (!db.User.me) {
                this.router.navigate(['/login']);
                return false;
            } else if (db.User.me.isConfigCompleted) {
                return true;
            }
            const userType = db.User.me.iscomp ? '/unternehmen' : '/bewerber';
            this.router.navigate(['/config' + userType]);
            return false;
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
            const module = db.User.me.isConfigCompleted ? '/swipe' : '/config';
            this.router.navigate([module + '/bewerber']);
            return false;
        });
    }
}

@Injectable()
export class NotIsCompany implements CanActivate {
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
            const module = db.User.me.isConfigCompleted ? '/swipe' : '/config';
            this.router.navigate([module + '/unternehmen']);
            return false;
        });
    }
}

export const DB_PROVIDERS = [DBReady, DBLoggedIn, IsCompany, NotIsCompany, ConfigCompleted];
