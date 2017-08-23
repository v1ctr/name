import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {AuthService} from '../_services/auth.service';

@Component({
    templateUrl: './account.component.html',
})
export class AccountComponent {

    me: model.User;

    oldPassword;
    newPassword;
    newPasswordRepeat;

    error;

    constructor(private router: Router, public authService: AuthService) {
        if (db.User.me) {
            this.me = db.User.me;
        }
    }

    setNewPassword() {
        if (this.newPasswordRepeat === this.newPassword) {
            db.User.newPassword(this.me.username, this.oldPassword, this.newPassword).then(
                () => {
                },
                (error) => {
                    this.error = error.message;
                }
            );
        } else {
            this.error = 'Passwörter stimmen nicht überein!';
        }
    }

    deleteUser() {
        const deletePromises = [];
        if (this.me.iscomp) {
            db.Unternehmen.find().equal('userid', this.me).singleResult((unternehmen) => {
                db.Stellenangebot.find().equal('unternehmen', unternehmen).resultList((stellenangebote) => {
                    stellenangebote.forEach((angebot) => {
                        db.Match.find().equal('angebot', angebot).resultList((matches) => {
                            matches.forEach((match) => {
                                deletePromises.push(match.delete());
                            });
                        });
                        db.BewerberLikes.find().equal('angebot', angebot).resultList((likes) => {
                            likes.forEach((like) => {
                                deletePromises.push(like.delete());
                            });
                        });
                        deletePromises.push(angebot.delete());
                    })
                });

                db.UnternehmenLikes.find().equal('unternehmen', unternehmen).resultList((likes) => {
                    likes.forEach((like) => {
                        deletePromises.push(like.delete());
                    });
                });


                deletePromises.push(unternehmen.delete());
            });
        } else {
            db.Bewerber.find().equal('user', this.me).singleResult((bewerber) => {
                db.Match.find().equal('bewerber', bewerber).resultList((matchs) => {
                    matchs.forEach((match) => {
                        deletePromises.push(match.delete());
                    });
                });
                db.BewerberLikes.find().equal('bewerber', bewerber).resultList((likes) => {
                    likes.forEach((like) => {
                        deletePromises.push(like.delete());
                    });
                });
                db.UnternehmenLikes.find().equal('bewerber', bewerber).resultList((likes) => {
                    likes.forEach((like) => {
                        deletePromises.push(like.delete());
                    });
                });

                deletePromises.push(bewerber.delete());
            });
        }
        deletePromises.push(this.me.delete());
        Promise.all(deletePromises).then(() => {
            db.User.logout().then(() => {
                this.authService.isLoginSubject.next(false);
                this.router.navigate(['/signup']);
            });
        }, (error) => {
            this.error = error.message;
        });
    }
}
