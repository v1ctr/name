import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {ActivatedRoute} from '@angular/router';

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


    constructor(private authService: AuthService,
                private route: ActivatedRoute) {
        this.user = db.User.me;
        this.bewerber = this.route.snapshot.data['bewerber'];
        const dropDownData = this.route.snapshot.data['dropDownData'];
        this.sprachen = dropDownData[0]; // this.route.snapshot.data['sprachen'];
        this.berufsfelder = dropDownData[1]; // this.route.snapshot.data['berufsfelder'];
        this.vertragsarten = dropDownData[2]; // this.route.snapshot.data['vertragsarten'];
        this.arbeitsverhaeltnisse = dropDownData[3]; // this.route.snapshot.data['arbeitsverhaeltnisse'];
    }

    ngOnInit() {
        // DropDowns kommen nicht mit Sets klar, daher in Array transformieren
        if (this.bewerber.vertragsarten) {
            this.bewerber.vertragsarten.forEach((element) => {
                this.selectedVertragsarten.push(element);
            });
        }
        if (this.bewerber.sprachen) {
            this.bewerber.sprachen.forEach((element) => {
                this.selectedSprachen.push(element);
            });
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
        return (new db.File(file)).delete({force: true});
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
