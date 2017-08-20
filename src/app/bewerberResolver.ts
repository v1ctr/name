import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {db, model} from 'baqend';
import {Observable} from 'rxjs/Observable';
import {BewerberService} from './bewerberService';

@Injectable()
export class BewerberResolver implements Resolve<model.Bewerber> {

    constructor(private bewerberService: BewerberService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<model.Bewerber> | Promise<model.Bewerber> | model.Bewerber {
        return this.bewerberService.getBewerber().then((bewerber) => {
            if (bewerber) {
                return bewerber;
            } else {
                const newBewerber = new db.Bewerber();
                newBewerber.user = db.User.me;
                newBewerber.vertragsarten = [];
                newBewerber.sprachen = [];
                return newBewerber;
            }
        });
    }

}
