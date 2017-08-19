import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {db, model} from 'baqend';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
  selector: 'app-swipe-unternehmen',
  templateUrl: 'swipe-unternehmen.component.html',
})
export class SwipeUnternehmenComponent implements OnInit {

    unternehmen: model.Unternehmen;
    cards: any[] = [];
    cardCursor: number = 0;
    orientation: string = "x";
    overlay: any = {
        like: {
            backgroundColor: '#28e93b'
        },
        dislike: {
            backgroundColor: '#e92828'
        }
    };

  constructor(private router: Router, public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.getBewerber();
  }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        console.log(event);

        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.like(true);
        }

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.like(false);
        }
    }

    like(like: boolean) {
        var self = this;
        if (this.cards.length > 0) {
            self.cards[this.cardCursor].likeEvent.emit({like});
            self.notifyServer({like: like});
            this.cardCursor++;
        }
    }


    onCardLike(event) {
        this.notifyServer(event);
        this.cardCursor++;

    }

    onRelease(event) {


    }

    onAbort(event) {

    }

    onSwipe(event) {

  }

  notifyServer(event){
    var item = this.cards[this.cardCursor];
    db.Bewerber.load(item.id)
      .then((bewerber)=>{
        if(bewerber){
          db.UnternehmenLikes.find()
            .equal('unternehmen', this.unternehmen)
            .equal('bewerber', bewerber)
            .singleResult((unternehmenLike)=>{
              if(unternehmenLike){
                //Like existiert bereits, deswegen update
                unternehmenLike.like = event.like;
                unternehmenLike.update()
                  .then(()=>{
                    console.log("Update: UnternehmenLike");
                    if(event.like){
                      this.checkIfMatch(bewerber);
                    }
                  });
              }else{
                unternehmenLike = new db.UnternehmenLikes({
                  unternehmen: this.unternehmen,
                  bewerber: bewerber,
                  like: event.like
                });
                unternehmenLike.insert().then(function() {
                  console.log("Eingefügt: UnternehmenLike");
                  if(event.like){
                    this.checkIfMatch(bewerber);
                  }
                });
              }
            });
        }
      });
  }

  getBewerber(){
    if(db.User.me.iscomp){
      db.Unternehmen.find()
        .equal('userid', db.User.me)
        .singleResult((unternehmen)=>{
          if(unternehmen){
            this.unternehmen = unternehmen;
            db.Stellenangebot.find()
              .equal('unternehmen', unternehmen)
              .resultList((angebote)=>{
                var arbeitsorte = [];
                var berufsfelder = [];
                angebote.forEach((angebot)=>{
                  if(angebot.arbeitsort){
                    arbeitsorte.push(angebot.arbeitsort);
                  }
                  if(angebot.berufsfeld){
                    berufsfelder.push(angebot.berufsfeld);
                  }
                });
                db.Bewerber.find()
                  .in('arbeitsort', arbeitsorte)
                  .in('berufsfeld', berufsfelder)
                  .resultList((bewerber)=>{
                    bewerber.forEach((bew) => {
                      this.cards.push({
                        id: bew.id,
                        likeEvent: new EventEmitter(),
                        destroyEvent: new EventEmitter(),
                        pitch: bew.pitch,
                        vorname: bew.vorname,
                        nachname: bew.nachname,
                        profilbild: bew.profilbild
                      });
                    });
                  });
              });
          }
        });
    }
  }

  checkIfMatch(bewerber){
    db.modules.get('checkMatch', {unternehmen: this.unternehmen, bewerber: bewerber})
      .then((result)=>{
        if(result.match){
          this.snackBar.open("It's a Match!", '', {
            duration: 2000
          });
        }
      });
  }
}
