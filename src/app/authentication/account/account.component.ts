import {Component} from '@angular/core';
import {db} from 'baqend';
import {AuthService} from '../../_services/auth.service';
import {LoggerService} from '../../logging/logger.service';
import {BewerberService} from '../../_services/bewerber.service';
import {UnternehmenService} from '../../_services/unternehmen.service';

@Component({
    templateUrl: './account.component.html',
})
export class AccountComponent {

    public username: string;
    public oldPassword;
    public newPassword;
    public newPasswordRepeat;


    constructor(private authService: AuthService, private logService: LoggerService,
                private bewerberService: BewerberService, private unternehmenService: UnternehmenService) {
        this.username = db.User.me.username;
    }

    setNewPassword() {
        if (this.newPasswordRepeat === this.newPassword) {
            this.authService.newPassword(this.username, this.oldPassword, this.newPassword);
        } else {
            this.logService.logError('Passwörter stimmen nicht überein!');
        }
    }

    /**
     * Löscht den Bewerber / das Unternehmen, die mit dem User verknüpft sind, sowie die Dateien es Users.
     * Stellenangebote, Likes und Matches werden in der Datenbank geöscht, da dafür teilweise erhöhte Rechte nötig sind.
     * Außerdem wird im backend ganz am Ende der User von der Rolle bewerber/company entfernt.
     */
    deleteUser() {
        const deletePromises = [];
        if (db.User.me.iscomp) {
            this.unternehmenService.getUnternehmen().then((unternehmen) => {
                if (unternehmen) {
                    if (unternehmen.logo) {
                        const logo: any = unternehmen.logo;
                        deletePromises.push(logo.delete({force: true}).then(() => {
                        }, (error) => {
                            this.logService.logError('Could not delete unternehmen logo');
                        }));
                    }
                    if (unternehmen.bild) {
                        const bild: any = unternehmen.bild;
                        deletePromises.push(bild.delete({force: true}).then(() => {
                        }, (error) => {
                            this.logService.logError('Could not delete unternehmen logo');
                        }));
                    }
                    deletePromises.push(unternehmen.delete({force: true}).then(() => {
                    }, (error) => {
                        this.logService.logError('Could not delete company associated with this user.');
                    }));
                }
            });
        } else {
            this.bewerberService.getBewerber().then((bewerber) => {
                if (bewerber) {
                    if (bewerber.profilbild) {
                        const profilbild: any = bewerber.profilbild;
                        deletePromises.push(profilbild.delete({force: true}).then(() => {
                        }, (error) => {
                            this.logService.logError('Could not delete bewerber profilbild');
                        }));
                    }
                    if (bewerber.lebenslauf) {
                        const lebenslauf: any = bewerber.lebenslauf;
                        deletePromises.push(lebenslauf.delete({force: true}).then(() => {
                        }, (error) => {
                            this.logService.logError('Could not delete bewerber lebenslauf');
                        }));
                    }
                    deletePromises.push(bewerber.delete({force: true}).then(() => {
                    }, (error) => {
                        this.logService.logError('Could not delete bewerber associated with this user.');
                    }));
                } else {
                }
            }, (error) => {
            });
        }
        Promise.all(deletePromises).then(() => {
            this.authService.signout();
        }, (error) => {
            this.logService.logError('Fehler beim Löschen');
        });
    }
}
