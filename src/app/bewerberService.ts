import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    private bewerberPromise: Promise<model.Bewerber>;

    constructor() {
        this.bewerberPromise = db.Bewerber.find().equal('user', db.User.me).singleResult();
    }

    public getBewerber(): Promise<model.Bewerber> {
        return this.bewerberPromise;
    }
}

