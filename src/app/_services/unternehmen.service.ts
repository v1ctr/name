import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class UnternehmenService {

    public getUnternehmen(): Promise<model.Unternehmen> {
        return db.Unternehmen.find().equal('userid', db.User.me).singleResult();
    }

    public getNewUnternehmen(): model.Unternehmen {
        const unternehmen = new db.Unternehmen();
        unternehmen.userid = db.User.me;
        unternehmen.email = db.User.me.username;
        return unternehmen;
    }
}
