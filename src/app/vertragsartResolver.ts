import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {db, model} from 'baqend';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VertragsartResolver implements Resolve<model.Vertragsart[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<model.Vertragsart[]> | Promise<model.Vertragsart[]> | model.Vertragsart[] {
        return db.Vertragsart.find().ascending('name').resultList().then((vertragsarten) => {
            return vertragsarten;
        });
    }
}
