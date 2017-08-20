import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {db, model} from 'baqend';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BerufsfeldResolver implements Resolve<model.Berufsfeld[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<model.Berufsfeld[]> | Promise<model.Berufsfeld[]> | model.Berufsfeld[] {
        return db.Berufsfeld.find().ascending('name').resultList().then((berufsfelder) => {
            return berufsfelder;
        });
    }
}
