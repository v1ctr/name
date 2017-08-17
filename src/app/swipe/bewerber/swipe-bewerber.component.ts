import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GRADIENTS} from '../../gradients';
import {db, model} from 'baqend';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
  selector: 'app-swipe-bewerber',
  templateUrl: 'swipe-bewerber.component.html',
  styleUrls: ['swipe-bewerber.component.scss']
})
export class SwipeBewerberComponent implements OnInit {

    bewerber: model.Bewerber;
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

  constructor(private router: Router) {
  }

  ngOnInit() {


    this.getStellenangebote();

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
    db.Stellenangebot.load(item.id)
      .then((angebot)=>{
        if(angebot){
          db.BewerberLikes.find()
            .equal('bewerber', this.bewerber)
            .equal('angebot', angebot)
            .singleResult((bewerberLike)=>{
              if(bewerberLike){
                //Like existiert bereits, deswegen update
                bewerberLike.like = event.like;
                bewerberLike.update()
                  .then(()=>{
                    console.log("Update: BewerberLike");
                  });
              }else{
                bewerberLike = new db.BewerberLikes({
                  bewerber: this.bewerber,
                  angebot: angebot,
                  like: event.like
                });
                bewerberLike.insert().then(function(res) {
                  console.log("Eingefügt: BewerberLike");
                  console.log(res);
                });
              }
            });
        }
      });
  }


  getStellenangebote(){
    if(!db.User.me.iscomp){
      db.Bewerber.find()
        .equal('user', db.User.me)
        .singleResult((bewerber) => {
          if(bewerber){
            this.bewerber = bewerber;
            var queryBuilder = db.Stellenangebot.find();

            if(this.bewerber.arbeitsort){
              queryBuilder.and(queryBuilder, queryBuilder.equal('arbeitsort', this.bewerber.arbeitsort));
            }
            if(this.bewerber.sprachen){

            }
            if(this.bewerber.berufsfeld){
              queryBuilder.and(queryBuilder, queryBuilder.equal('berufsfeld', this.bewerber.berufsfeld));
            }
            db.Stellenangebot.find()
              .equal('arbeitsort', this.bewerber.arbeitsort)
              .equal('berufsfeld', this.bewerber.berufsfeld)
              .resultList({depth: 1}, (angebote) => {
                angebote.forEach((angebot) => {
                  this.cards.push({
                    id: angebot.id,
                    likeEvent: new EventEmitter(),
                    destroyEvent: new EventEmitter(),
                    pitch: angebot.unternehmen.pitch,
                    bezeichnung: angebot.bezeichnung,
                    beschreibung: angebot.beschreibung
                  });
                });
              });
          }
        });
    }
  }
}
