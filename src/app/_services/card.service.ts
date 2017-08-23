import {Injectable, EventEmitter} from '@angular/core';
import {db, model} from 'baqend';
import {VacancyService} from "./vacancy.service";

@Injectable()
export class CardService {

    constructor(private vacancyService: VacancyService) {
    }

    getCardsForBewerber(bewerber: model.Bewerber){
        let query = {};
        let cards = [];
        let filter = db.Stellenangebot.find();
        if (bewerber.arbeitsort) {
            query['arbeitsort'] = bewerber.arbeitsort;
        }
        if (bewerber.berufsfeld) {
            query['berufsfeld'] = bewerber.berufsfeld;
        }
        if (bewerber.sprachen) {
            // @todo
        }
        return db.Stellenangebot.find()
            .where(query)
            .resultList({depth: 1}, (angebote)=>{
                angebote.forEach((angebot) => {
                    cards.push({
                        likeEvent: new EventEmitter(),
                        destroyEvent: new EventEmitter(),
                        angebot: angebot
                    });
                });
                return cards;
            });
    }

    getCardsForUnternehmen(unternehmen: model.Unternehmen){
        const arbeitsorte = [];
        const berufsfelder = [];
        let cards = [];
        return this.vacancyService.getVacancies().then((angebote) => {
            angebote.forEach((angebot) => {
                if (angebot.arbeitsort) {
                    arbeitsorte.push(angebot.arbeitsort);
                }
                if (angebot.berufsfeld) {
                    berufsfelder.push(angebot.berufsfeld);
                }
            });
            return db.Bewerber.find().in('arbeitsort', arbeitsorte).in('berufsfeld', berufsfelder).resultList((bewerberListe) => {
                bewerberListe.forEach((bewerber) => {
                    cards.push({
                        likeEvent: new EventEmitter(),
                        destroyEvent: new EventEmitter(),
                        bewerber: bewerber
                    });
                });
                return cards;
            });
        });
    }
}
