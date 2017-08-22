import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class DropDownDataService {

    private sprachen: Promise<model.Sprache[]>;
    private vertragsarten: Promise<model.Vertragsart[]>;
    private berufsfelder: Promise<model.Berufsfeld[]>;
    private arbeitsverhaeltnisse: Promise<model.Arbeitsverhaeltnis[]>;

    constructor() {
        this.sprachen = db.Sprache.find().ascending('name').resultList();
        this.vertragsarten = db.Vertragsart.find().ascending('name').resultList();
        this.berufsfelder = db.Berufsfeld.find().ascending('name').resultList();
        this.arbeitsverhaeltnisse = db.Arbeitsverhaeltnis.find().ascending('name').resultList();
    }

    public getSprachen(): Promise<model.Sprache[]> {
        return this.sprachen;
    }

    public getBerufsfelder(): Promise<model.Berufsfeld[]> {
        return this.berufsfelder;
    }

    public getVertragsarten(): Promise<model.Vertragsart[]> {
        return this.vertragsarten;
    }

    public getArbeitsverhaeltnisse(): Promise<model.Arbeitsverhaeltnis[]> {
        return this.arbeitsverhaeltnisse;
    }
}
