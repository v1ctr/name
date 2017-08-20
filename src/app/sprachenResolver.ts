import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SprachenResolver implements Resolve<model.Sprache[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<model.Sprache[]> | Promise<model.Sprache[]> | model.Sprache[] {
        return db.Sprache.find().ascending('name').resultList().then((sprachen) => {
            return sprachen;
        });
    }

}
