import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GRADIENTS} from '../gradients';
import {db, model} from 'baqend';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit {

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
            self.cards[this.cardCursor++].likeEvent.emit({like});
            // DO STUFF WITH YOUR CARD
        }
    }


    onCardLike(event) {
        var item = this.cards[this.cardCursor++];
        // DO STUFF WITH YOUR CARD
    }

    onRelease(event) {


    }

    onAbort(event) {

    }

    onSwipe(event) {

  }


  getStellenangebote(){
    if(!db.User.me.iscomp){
      db.Bewerber.find()
        .equal('user', db.User.me)
        .singleResult((bewerber) => {
          if(bewerber){
            var queryBuilder = db.Stellenangebot.find();

            if(bewerber.arbeitsort){
              queryBuilder.and(queryBuilder, queryBuilder.equal('arbeitsort', bewerber.arbeitsort));
            }
            if(bewerber.sprachen){

            }
            if(bewerber.berufsfeld){
              queryBuilder.and(queryBuilder, queryBuilder.equal('berufsfeld', bewerber.berufsfeld));
            }
            db.Stellenangebot.find()
              .equal('arbeitsort', bewerber.arbeitsort)
              .equal('berufsfeld', bewerber.berufsfeld)
              .resultList({depth: 1}, (angebote) => {
                angebote.forEach((angebot) => {
                  this.cards.push({
                    id: angebot.id,
                    likeEvent: new EventEmitter(),
                    destroyEvent: new EventEmitter(),
                    pitch: angebot.unternehmen.pitch,
                    bezeichnung: angebot.bezeichnung
                  });
                });
              });
          }
        });
    }
  }
}
