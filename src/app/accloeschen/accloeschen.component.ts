import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-accloeschen',
    templateUrl: './accloeschen.component.html',
    styleUrls: ['./accloeschen.component.scss']
})
export class AccloeschenComponent {

    me: model.User;

    constructor(private router: Router, public authService: AuthService) {
        if (db.User.me) {
            this.me = db.User.me;
        }
    }

    deleteUser() {
        const deletePromises = [];
        if (this.me.iscomp) {
            db.Unternehmen.find().equal('userid', this.me).singleResult((unternehmen) => {
                db.Stellenangebot.find().equal('unternehmen', unternehmen).resultList((stellenangebote) => {
                    stellenangebote.forEach((angebot) => {
                        deletePromises.push(angebot.delete());
                    })
                });

                db.UnternehmenLikes.find().equal('unternehmen', unternehmen).resultList((likes) => {
                    likes.forEach((like) => {
                        deletePromises.push(like.delete());
                    })
                });

                db.Match.find().equal('unternehmen', unternehmen).resultList((matches) => {
                    matches.forEach((match) => {
                        deletePromises.push(match.delete());
                    })
                });

                deletePromises.push(unternehmen.delete());
            });
        } else {
            db.Bewerber.find().equal('user', this.me).singleResult((bewerber) => {
                db.BewerberLikes.find().equal('bewerbee', bewerber).resultList((likes) => {
                    likes.forEach((like) => {
                        deletePromises.push(like.delete());
                    })
                });

                db.Match.find().equal('bewerber', bewerber).resultList((matchs) => {
                    matchs.forEach((match) => {
                        deletePromises.push(match.delete());
                    })
                });

                deletePromises.push(bewerber.delete());
            });
        }
        deletePromises.push(this.me.delete());
        Promise.all(deletePromises).then(() => {
            db.User.logout().then(() => {
                this.authService.isLoginSubject.next(false);
                this.router.navigate(['/']);
            });
        }, (error) => {
            // @todo Fehler anzeigen
        });
    }
}
