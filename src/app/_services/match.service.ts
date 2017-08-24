import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {VacancyService} from './vacancy.service';

@Injectable()
export class MatchService {

    constructor(private vacancyService: VacancyService) {
    }

    addBewerberInteraction(bewerber: model.Bewerber, angebot: model.Bewerber, like: boolean): Promise<any> {
        let bewerberLike;
        return db.BewerberLikes.find()
            .equal('bewerber', bewerber)
            .equal('angebot', angebot)
            .singleResult((result) => {
                if (result) {
                    bewerberLike = result;
                    bewerberLike.like = like;
                } else {
                    bewerberLike = new db.BewerberLikes({
                        bewerber: bewerber,
                        angebot: angebot,
                        like: like
                    });
                }
                return bewerberLike.save()
                    .then(() => {
                        if (like) {
                            return this.checkIfMatch(bewerber, angebot);
                        } else {
                            return Promise.resolve({match: false});
                        }
                    });
            });

    }

    addUnternehmenInteraction(unternehmen: model.Unternehmen, bewerber: model.Bewerber, like: boolean): Promise<any> {
        let unternehmenLike;
        return db.UnternehmenLikes.find()
            .equal('unternehmen', unternehmen)
            .equal('bewerber', bewerber)
            .singleResult((result) => {
                if (result) {
                    unternehmenLike = result;
                    unternehmenLike.like = like;
                } else {
                    unternehmenLike = new db.UnternehmenLikes({
                        unternehmen: unternehmen,
                        bewerber: bewerber,
                        like: like
                    });
                }
                return unternehmenLike.save()
                    .then(() => {
                        if (like) {
                            return this.checkIfUnternehmenMatch(bewerber);
                        } else {
                            return Promise.resolve({match: false});
                        }
                    });
            });
    }

    getGeseheheneBewerber(unternehmen: model.Unternehmen) {
        return db.UnternehmenLikes.find()
            .equal('unternehmen', unternehmen)
            .resultList((unternehmenLikes) => {
                let bewerber = [];
                unternehmenLikes.forEach((ul) => {
                    bewerber.push(ul.bewerber);
                });
                return bewerber;
            });
    }

    getGeseheheneStellenangebote(bewerber: model.Bewerber) {
        return db.BewerberLikes.find()
            .equal('bewerber', bewerber)
            .resultList((bewerberLikes) => {
                let angebote = [];
                bewerberLikes.forEach((bl) => {
                    angebote.push(bl.angebot);
                });
                return angebote;
            });
    }

    checkIfMatch(bewerber, angebot) {
        return db.modules.get('checkMatch', {angebot: angebot, bewerber: bewerber});
    }

    checkIfUnternehmenMatch(bewerber) {
        return this.vacancyService.getVacancies()
            .then((angebote) => {
                return db.BewerberLikes.find()
                    .in('angebot', angebote)
                    .equal('like', true)
                    .equal('bewerber', bewerber)
                    .singleResult((bewerberLike) => {
                        if (!bewerberLike) {
                            return Promise.resolve({match: false});
                        } else {
                            let match = new db.Match({
                                angebot: angebote,
                                bewerber: bewerber
                            });
                            return match.save()
                                .then(() => {
                                    return Promise.resolve({match: true});
                                });
                        }
                    });
            });
    }
}
