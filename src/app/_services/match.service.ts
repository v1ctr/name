import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {VacancyService} from './vacancy.service';

/**
 * Der MatchService speichert die Likes der Bewerber und Unternehmen
 * und prüft, ob es zu einem Match kommt.
 * Falls ja, wird dieses gespeichert.
 */
@Injectable()
export class MatchService {

    constructor(private vacancyService: VacancyService) {
    }

    /**
     * speichert BewerberLikes
     *
     * @param {"baqend".model.Bewerber} bewerber
     * @param {"baqend".model.Bewerber} angebot
     * @param {boolean} like
     * @returns {Promise<any>}
     */
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
                            return this.checkIfBewerberMatch(bewerber, angebot);
                        } else {
                            return Promise.resolve({match: false});
                        }
                    });
            });

    }

    /**
     * Speichert UnternehmenLikes
     *
     * @param {"baqend".model.Unternehmen} unternehmen
     * @param {"baqend".model.Bewerber} bewerber
     * @param {boolean} like
     * @returns {Promise<any>}
     */
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

    /**
     * Ermittelt Bewerber, die bereits geliked/disliked wurden, damit diese nicht erneut angezeigt werden.
     *
     * @param {"baqend".model.Unternehmen} unternehmen
     * @returns {Promise<Array<T>>}
     */
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

    /**
     * Ermittelt Angebote, die bereits geliked/disliked wurden, damit diese nicht erneut angezeigt werden.
     *
     * @param {"baqend".model.Bewerber} bewerber
     * @returns {Promise<Array<T>>}
     */
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

    /**
     * Prüft nach Like durch Bewerber, ob es bereits einen entsprechenden Like des Unternehmens gibt.
     *
     * @param bewerber
     * @param angebot
     * @returns {Promise<T>}
     */
    checkIfBewerberMatch(bewerber, angebot) {
        return db.UnternehmenLikes.find()
            .equal('like', true)
            .equal('bewerber', bewerber)
            .equal('unternehmen', angebot.unternehmen)
            .singleResult((unternehmenLike) => {
                if (!unternehmenLike) {
                    return Promise.resolve({match: false});
                } else {
                    let match = new db.Match({
                        angebot: angebot,
                        bewerber: bewerber
                    });
                    return match.save()
                        .then(() => {
                            return Promise.resolve({match: true});
                        });
                }
            })
    }

    /**
     * Prüft nach Like durch Unternehmen, ob es bereits einen entsprechenden Like des Bewerbers gibt.
     *
     * @param bewerber
     * @returns {Promise<"baqend".model.Stellenangebot[]>}
     */
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
                                angebot: bewerberLike.angebot,
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
