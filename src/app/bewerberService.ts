import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    private bewerber: Promise<model.Bewerber>;

    constructor() {
        this.bewerber = db.Bewerber.find().equal('user', db.User.me).singleResult();
    }

    public getBewerber(): Promise<model.Bewerber> {
        return this.bewerber;
    }
}
