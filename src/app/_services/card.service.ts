import {Injectable, EventEmitter} from '@angular/core';
import {db, model} from 'baqend';
import {VacancyService} from "./vacancy.service";
import {MatchService} from "./match.service";

@Injectable()
export class CardService {

    constructor(private vacancyService: VacancyService, private matchService: MatchService) {
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
        return this.matchService.getGeseheheneStellenangebote(bewerber)
            .then((geseheneAngebote)=>{
                return db.Stellenangebot.find()
                    .where(query)
                    .notIn('id', geseheneAngebote)
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
            });
    }

    getCardsForUnternehmen(unternehmen: model.Unternehmen){
        const arbeitsorte = [];
        const berufsfelder = [];
        let bereitsGeseheneBewerber = [];
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
            return this.matchService.getGeseheheneBewerber(unternehmen)
                .then((geseheneBewerber)=>{
                console.log(geseheneBewerber);
                    return db.Bewerber.find()
                        .in('arbeitsort', arbeitsorte)
                        .in('berufsfeld', berufsfelder)
                        .notIn('id', geseheneBewerber)
                        .resultList((bewerberListe) => {
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
        });
    }
}