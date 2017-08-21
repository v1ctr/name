import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class DropDownDataService {

    private sprachen: model.Sprache[];
    private vertragsarten: model.Vertragsart[];
    private berufsfelder: model.Berufsfeld[];
    private arbeitsverhaeltnisse: model.Arbeitsverhaeltnis[];

    constructor() {
        db.Sprache.find().ascending('name').resultList((sprachen) => {
            this.sprachen = sprachen;
        });
        db.Vertragsart.find().ascending('name').resultList((vertragsarten) => {
            this.vertragsarten = vertragsarten;
        });
        db.Berufsfeld.find().ascending('name').resultList((berufsfelder) => {
            this.berufsfelder = berufsfelder;
        });
        db.Arbeitsverhaeltnis.find().ascending('name').resultList((arbeitsverhaeltnisse) => {
            this.arbeitsverhaeltnisse = arbeitsverhaeltnisse;
        });
    }

    public getSprachen(): model.Sprache[] {
        return this.sprachen;
    }

    public getBerufsfelder(): model.Berufsfeld[] {
        return this.berufsfelder;
    }

    public getVertragsarten(): model.Vertragsart[] {
        return this.vertragsarten;
    }

    public getArbeitsverhaeltnisse(): model.Arbeitsverhaeltnis[] {
        return this.arbeitsverhaeltnisse;
    }
}
