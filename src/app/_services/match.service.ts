import {Injectable} from '@angular/core';
import {db, model} from 'baqend';

@Injectable()
export class MatchService {

    constructor(){}

    addBewerberInteraction(bewerber: model.Bewerber, angebot: model.Bewerber, like: boolean): Promise<any>{
        let bewerberLike;
        return db.BewerberLikes.find()
            .equal('bewerber', bewerber)
            .equal('angebot', angebot)
            .singleResult((result)=>{
                if(result){
                    bewerberLike = result;
                    bewerberLike.like = like;
                }else{
                    bewerberLike = new db.BewerberLikes({
                       bewerber: bewerber,
                        angebot: angebot,
                        like: like
                    });
                }
                return bewerberLike.save()
                    .then(()=>{
                        if(like){
                            return this.checkIfMatch(bewerber, angebot);
                        }else{
                            return Promise.resolve({match: false});
                        }
                    });
            });

    }

    addUnternehmenInteraction(unternehmen: model.Unternehmen, bewerber: model.Bewerber, like: boolean): Promise<any>{
        let unternehmenLike;
        return db.UnternehmenLikes.find()
            .equal('unternehmen', unternehmen)
            .equal('bewerber', bewerber)
            .singleResult((result)=>{
                if(result){
                    unternehmenLike = result;
                    unternehmenLike.like = like;
                }else{
                    unternehmenLike = new db.UnternehmenLikes({
                        unternehmen: unternehmen,
                        bewerber: bewerber,
                        like: like
                    });
                }
                return unternehmenLike.save()
                    .then(()=>{
                        if(like){
                            return this.checkIfUnternehmenMatch(unternehmen, bewerber);
                        }else{
                            return Promise.resolve({match: false});
                        }
                    });
            });
    }

    checkIfMatch(bewerber, angebot) {
        return db.modules.get('checkMatch', {angebot: angebot, bewerber: bewerber});
    }

    checkIfUnternehmenMatch(unternehmen, bewerber){
        return db.modules.get('checkMatch', {unternehmen: unternehmen, bewerber: bewerber});
    }
}
