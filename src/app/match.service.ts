import {Injectable} from '@angular/core';
import { Observable } from "rxjs";
import {db} from 'baqend/realtime';

@Injectable()
export class MatchService {

  stream = new Observable<any>();

  constructor(){
    var self = this;
    db.ready().then(() => {
      if (db.User.me) {
       if(db.User.me.iscomp){
         db.Unternehmen.find()
           .equal('userid', db.User.me)
           .singleResult((unternehmen)=>{
            if(unternehmen){
              db.Stellenangebot.find()
                .equal('unternehmen', unternehmen)
                .resultList((angebote)=>{
                  self.stream = db.Match.find()
                    .in('angebot', angebote)
                    .resultStream();
                });
            }
           });
       } else {
         db.Bewerber.find()
           .equal('user', db.User.me)
           .singleResult((bewerber)=>{
             console.log(bewerber);
           });
       }
      }
    });
  }

  getStream(){
    return this.stream;
  }
}
