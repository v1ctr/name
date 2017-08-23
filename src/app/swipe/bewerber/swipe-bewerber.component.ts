import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {db, model} from 'baqend';
import {BewerberService} from '../../bewerber.service';

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

    constructor(private router: Router, public snackBar: MdSnackBar, private bewerberService: BewerberService) {
    }

    ngOnInit() {
        this.bewerberService.getBewerber().then((bewerber) => {
            this.bewerber = bewerber;
            this.getStellenangebote();
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
        if (this.cards.length > 0) {
            this.cards[this.cardCursor].likeEvent.emit({like});
            this.notifyServer({like: like});
        }
    }

    onCardLike(event) {
        this.notifyServer(event);
    }

    onRelease(event) {
    }

    onAbort(event) {
    }

    onSwipe(event) {
    }

    notifyServer(event) {
        const item = this.cards[this.cardCursor];
        const angebot = this.matchingAngebote.find((matchingAngebot) => matchingAngebot.id === item.id);
        if (angebot) {
            const bewerberLike = new db.BewerberLikes({
                bewerber: this.bewerber,
                angebot: angebot,
                like: event.like
            });
            bewerberLike.save().then(() => {
                if (event.like) {
                    this.checkIfMatch(angebot);
                }
            });
        }
        this.cardCursor++;
        if (this.cardCursor === this.cards.length) {
            this.cards = null;
        }
    }


    getStellenangebote() {
        const alreadyLikedAngebote = [];
        db.BewerberLikes.find().equal('bewerber', this.bewerber).resultList((likes) => {
            likes.forEach((like) => {
                alreadyLikedAngebote.push(like.angebot);
            });
        });
        let filter = db.Stellenangebot.find().notIn('id', alreadyLikedAngebote); // @todo: funzt noch nicht
        if (this.bewerber.arbeitsort) {
            filter = filter.equal('arbeitsort', this.bewerber.arbeitsort);
        }
        if (this.bewerber.berufsfeld) {
            filter = filter.equal('berufsfeld', this.bewerber.berufsfeld);
        }
        if (this.bewerber.sprachen) {
            // @todo
        }
        filter.resultList((angebote) => {
            this.matchingAngebote = angebote;
            angebote.forEach((angebot) => {
                const card = {
                    id: angebot.id,
                    likeEvent: new EventEmitter(),
                    destroyEvent: new EventEmitter(),
                    pitch: null,
                    bezeichnung: angebot.bezeichnung,
                    beschreibung: angebot.beschreibung,
                    logo: null,
                    anforderung: angebot.anforderung,
                    arbeitsort: angebot.arbeitsort,
                    gehalt: angebot.monatsgehalt
                };
                if (angebot.unternehmen) {
                    db.Unternehmen.load(angebot.unternehmen.id).then((unternehmen) => {
                        card.pitch = unternehmen.pitch;
                        card.logo = unternehmen.logo;
                    });
                }
                this.cards.push(card);
            });
        });
    }

    checkIfMatch(angebot) {
        db.modules.get('checkMatch', {angebot: angebot, bewerber: this.bewerber}).then((result) => {
            if (result.match) {
                this.snackBar.open('It\'s a Match!', '', {duration: 2000});
            }
        });
    }
}
