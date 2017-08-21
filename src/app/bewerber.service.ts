import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    private bewerber: model.Bewerber;

    constructor() {
        db.Bewerber.find().equal('user', db.User.me).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                this.bewerber = this.getNewBewerber();
            }
        });
    }

    public getBewerber(): model.Bewerber {
        return this.bewerber;
    }

    public getNewBewerber(): model.Bewerber {
        const bewerber = new db.Bewerber();
        bewerber.user = db.User.me;
        bewerber.sprachen = [];
        bewerber.vertragsarten = [];
        return bewerber;
    }
}

