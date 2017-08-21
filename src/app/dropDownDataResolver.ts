import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DropDownDataService} from './drop-down-data.service';

@Injectable()
export class DropDownDataResolver implements Resolve<any> {

    constructor(private dropDownDataService: DropDownDataService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const pendingPromises = [];
        pendingPromises.push(this.dropDownDataService.getSprachen().then());
        pendingPromises.push(this.dropDownDataService.getBerufsfelder());
        pendingPromises.push(this.dropDownDataService.getVertragsarten());
        pendingPromises.push(this.dropDownDataService.getArbeitsverhaeltnisse());
        return Promise.all(pendingPromises).then((data) => {
            return data;
        });
    }

}
