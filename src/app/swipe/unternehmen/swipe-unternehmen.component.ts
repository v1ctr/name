import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {db, model} from 'baqend';
import {UnternehmenService} from '../../unternehmen.service';
import {VacancyService} from '../../vacancy.service';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
    templateUrl: 'swipe-unternehmen.component.html',
})
export class SwipeUnternehmenComponent implements OnInit {

    unternehmen: model.Unternehmen;
    angebote: model.Stellenangebot[];
    matchingBewerber: model.Bewerber[];
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

    constructor(private router: Router,
                public snackBar: MdSnackBar,
                private unternehmenService: UnternehmenService,
                private vacancyService: VacancyService) {
    }

    ngOnInit() {
        this.unternehmenService.getUnternehmen().then((unternehmen) => {
            this.unternehmen = unternehmen;
            this.vacancyService.getVacancies().then((vacancies) => {
                this.angebote = vacancies;
                this.getBewerber();
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
        const currentBewerber = this.matchingBewerber.find((bewerber) => bewerber.id === item.id);
        const unternehmenLike = new db.UnternehmenLikes({
            unternehmen: this.unternehmen,
            bewerber: currentBewerber,
            like: event.like
        });
        unternehmenLike.insert().then(() => {
            if (event.like) {
                this.checkIfMatch(currentBewerber);
            }
        });
        this.cardCursor++;
        if (this.cardCursor === this.cards.length) {
            this.cards = null;
        }
    }

    getBewerber() {
        const arbeitsorte = [];
        const berufsfelder = [];
        this.angebote.forEach((angebot) => {
            if (angebot.arbeitsort) {
                arbeitsorte.push(angebot.arbeitsort);
            }
            if (angebot.berufsfeld) {
                berufsfelder.push(angebot.berufsfeld);
            }
        });
        db.Bewerber.find().in('arbeitsort', arbeitsorte).in('berufsfeld', berufsfelder).resultList((bewerberListe) => {
            this.matchingBewerber = bewerberListe;
            bewerberListe.forEach((bewerber) => {
                this.cards.push({
                    id: bewerber.id,
                    likeEvent: new EventEmitter(),
                    destroyEvent: new EventEmitter(),
                    pitch: bewerber.pitch,
                    titel: bewerber.titel,
                    vorname: bewerber.vorname,
                    nachname: bewerber.nachname,
                    profilbild: bewerber.profilbild,
                    ausbildung: bewerber.ausbildung,
                    softskills: bewerber.softskills,
                    fachkompetenzen: bewerber.fachkompetenzen,
                    geburtsdatum: bewerber.geburtsdatum
                });
            });
        });
    }

    checkIfMatch(bewerber) {
        db.modules.get('checkMatch', {unternehmen: this.unternehmen, bewerber: bewerber}).then(
            (result) => {
                if (result.match) {
                    this.snackBar.open('It\'s a Match!', '', {duration: 2000});
                }
            });
    }
}
