import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    public getBewerber(): Promise<model.Bewerber> {
        return db.Bewerber.find().equal('user', db.User.me).singleResult();
        ;
    }

    public getNewBewerber(): model.Bewerber {
        const bewerber = new db.Bewerber();
        bewerber.user = db.User.me;
        bewerber.sprachen = [];
        bewerber.vertragsarten = [];
        bewerber.email = db.User.me.username;
        return bewerber;
    }
}

