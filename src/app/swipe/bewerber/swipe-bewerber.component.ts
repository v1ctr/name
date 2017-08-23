import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {db, model} from 'baqend';
import { BewerberService } from '../../_services/bewerber.service';
import { CardService } from '../../_services/card.service';
import { MatchService } from '../../_services/match.service';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
    templateUrl: 'swipe-bewerber.component.html',
})
export class SwipeBewerberComponent implements OnInit {

    bewerber: model.Bewerber;
    matchingAngebote: model.Stellenangebot[];
    cards: any[] = [];
    cardCursor = 0;
    orientation = 'x';
    overlay: any = {
        like: {
            backgroundColor: '#28e93b'
        },
        dislike: {
            backgroundColor: '#e92828'
        }
    };

    constructor(
        private router: Router,
        public snackBar: MdSnackBar,
        private bewerberService: BewerberService,
        private cardService: CardService,
        private matchService: MatchService) {}

    ngOnInit() {
        this.bewerberService.getBewerber().then((bewerber) => {
            this.bewerber = bewerber;
            this.cardService.getCardsForBewerber(this.bewerber)
                .then((cards) => {
                    this.cards = cards;
                });
        });
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.like(true);
        }
        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.like(false);
        }
    }

    like(like: boolean) {
        console.log('like');
        if (this.cards.length > 0) {
            this.cards[this.cardCursor].likeEvent.emit({like});
            this.notifyServer(like);
        }
    }

    onCardLike(event) {
        console.log('onCardLike');
        this.notifyServer(event.like);
    }

    onRelease(event) {
    }

    onAbort(event) {
    }

    onSwipe(event) {
    }


    notifyServer(like) {
        console.log(like);
        const item = this.cards[this.cardCursor];
        this.matchService.addBewerberInteraction(this.bewerber, item.angebot, like)
            .then((res) => {
                if (res.match) {
                    this.snackBar.open('It\'s a Match!', '', {duration: 2000});
                }
            });
        this.cardCursor++;
        if (this.cardCursor === this.cards.length) {
            this.cards = null;
        }
    }
}
