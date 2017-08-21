import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {BewerberService} from "../../bewerber.service";
import {DropDownDataService} from "../../drop-down-data.service";

@Component({
    selector: 'app-config-bewerber',
    templateUrl: './config-bewerber.component.html',
})
export class ConfigBewerberComponent implements OnInit {

    user: model.User;
    bewerber: model.Bewerber;

    // Data for DropDowns
    vertragsarten: model.Vertragsart[];
    sprachen: model.Sprache[];
    berufsfelder: model.Berufsfeld[];
    arbeitsverhaeltnisse: model.Arbeitsverhaeltnis[];

    selectedVertragsarten: model.Vertragsart[] = [];
    selectedSprachen: model.Sprache[] = [];

    profilbild: any;
    lebenslauf: any;

    errors = [];


    constructor(private authService: AuthService, private bewerberService: BewerberService, private dropDownDataService: DropDownDataService) {
        this.user = db.User.me;
        this.bewerber = new db.Bewerber();
    }

    ngOnInit() {
        this.sprachen = this.dropDownDataService.getSprachen();
        this.berufsfelder = this.dropDownDataService.getBerufsfelder();
        this.vertragsarten = this.dropDownDataService.getVertragsarten();
        this.arbeitsverhaeltnisse = this.dropDownDataService.getArbeitsverhaeltnisse();
        // DropDowns kommen nicht mit Sets klar, daher in Array transformieren
        if (this.bewerber.vertragsarten) {
            this.selectedVertragsarten = Array.from(this.bewerber.vertragsarten);
        }
        if (this.bewerber.sprachen) {
            this.selectedSprachen = Array.from(this.bewerber.sprachen);
        }
        if (this.bewerber.profilbild) {
            this.profilbild = this.bewerber.profilbild;
        }
        if (this.bewerber.lebenslauf) {
            this.lebenslauf = this.bewerber.lebenslauf;
        }
    }

    save() {
        // dropDown-Daten in Sets zurückwandeln
        this.bewerber.vertragsarten = new Set(this.selectedVertragsarten);
        this.bewerber.sprachen = new Set(this.selectedSprachen);
        // FileUploads
        const pendingFileUploads = this.updateFiles();
        Promise.all(pendingFileUploads).then(() => {
            this.bewerber.save().then(() => {
                if (!this.user.isConfigCompleted) {
                    this.user.isConfigCompleted = true;
                    this.user.save().then(() => {
                        this.authService.isConfigCompleteSubject.next(true);
                    });
                }
            }, (error) => {
                this.errors.push(error.message);
            });
        });
    }

    private updateFiles() {
        const pendingFileUploads = [];
        if (this.profilbild && this.bewerber.profilbild && this.profilbild !== this.bewerber.profilbild) {
            // Bild hat sich geändert --> altes löschen, neues hinzufügen
            pendingFileUploads.push(this.deleteFile(this.bewerber.profilbild).then(() => {
            }, (error) => {
                this.errors.push(error.message);
            }));
            pendingFileUploads.push(this.uploadFile(this.profilbild).then((bild) => {
                this.bewerber.profilbild = bild;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.bewerber.profilbild && !this.profilbild) {
            // Datei ist enfernt worden --> löschen
            pendingFileUploads.push(this.deleteFile(this.bewerber.profilbild).then(() => {
                this.bewerber.profilbild = null;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.profilbild && !this.bewerber.profilbild) {
            pendingFileUploads.push(this.uploadFile(this.profilbild).then((bild) => {
                this.bewerber.profilbild = bild;
            }, (error) => {
                this.errors.push(error.message);
            }));
        }
        if (this.lebenslauf && this.bewerber.lebenslauf && this.lebenslauf !== this.bewerber.lebenslauf) {
            // Datei hat sich geändert --> alte löschen, neue hinzufügen
            pendingFileUploads.push(this.deleteFile(this.bewerber.lebenslauf).then(() => {
            }, (error) => {
                this.errors.push(error.message);
            }));
            pendingFileUploads.push(this.uploadFile(this.lebenslauf).then((datei) => {
                this.bewerber.lebenslauf = datei;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.bewerber.lebenslauf && !this.lebenslauf) {
            // Datei ist enfernt worden --> löschen
            pendingFileUploads.push(this.deleteFile(this.bewerber.lebenslauf).then(() => {
                this.bewerber.lebenslauf = null;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.lebenslauf && !this.bewerber.lebenslauf) {
            pendingFileUploads.push(this.uploadFile(this.lebenslauf).then((datei) => {
                this.bewerber.lebenslauf = datei;
            }, (error) => {
                this.errors.push(error.message);
            }));
        }
        return pendingFileUploads;
    }

    private getFilePath(): string {
        return 'users/' + this.user.key + '/';
    }

    private deleteFile(file) {
        return file.delete({force: true});
    }

    private uploadFile(file) {
        const image = new db.File({
            name: this.getFilePath() + file.name,
            data: file,
            type: 'blob'
        });
        return image.upload({force: true});
    }
}
