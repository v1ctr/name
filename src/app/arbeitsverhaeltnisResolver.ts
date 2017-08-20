import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {db, model} from 'baqend';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ArbeitsverhaeltnisResolver implements Resolve<model.Arbeitsverhaeltnis[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<model.Arbeitsverhaeltnis[]> | Promise<model.Arbeitsverhaeltnis[]> | model.Arbeitsverhaeltnis[] {
        return db.Arbeitsverhaeltnis.find().ascending('name').resultList().then((arbeitsverhaeltnisse) => {
            return arbeitsverhaeltnisse;
        });
    }
}
