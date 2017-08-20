import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class BewerberService {

    public getBewerber(): Promise<model.Bewerber> {
        return db.Bewerber.find().equal('user', db.User.me).singleResult();
    }
}
