import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    private bewerber: model.Bewerber;

    constructor() {
        db.Bewerber.find().equal('user', db.User.me).singleResult((bewerber) => {
            this.bewerber = bewerber;
        });
    }

    public getBewerber(): model.Bewerber {
        return this.bewerber;
    }
}

