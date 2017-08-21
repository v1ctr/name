import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class UnternehmenService {

    private unternehmen: model.Unternehmen;

    constructor() {
        db.Unternehmen.find().equal('userid', db.User.me).singleResult((unternehmen) => {
            if (unternehmen) {
                this.unternehmen = unternehmen;
            } else {
                this.unternehmen = this.getNewUnternehmen();
            }
        });
    }

    public getUnternehmen(): model.Unternehmen {
        return this.unternehmen;
    }

    private getNewUnternehmen(): model.Unternehmen {
        const unternehmen = new db.Unternehmen();
        unternehmen.userid = db.User.me;
        return unternehmen;
    }
}
