import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../_services/auth.service';
import {BewerberService} from '../../_services/bewerber.service';
import {DropDownDataService} from '../../_services/drop-down-data.service';
import {FormControl, Validators} from '@angular/forms';
import {LoggerService} from '../../logging/logger.service';
import {FileService} from '../../_services/file.service';

@Component({
    templateUrl: './config-bewerber.component.html',
})
export class ConfigBewerberComponent implements OnInit {

    pitchControl = new FormControl('', [
        Validators.maxLength(150)
    ]);
    fachkompetenzenControl = new FormControl('', [
        Validators.maxLength(100)
    ]);
    softskillsControl = new FormControl('', [
        Validators.maxLength(100)
    ]);
    ausbildungControl = new FormControl('', [
        Validators.maxLength(50)
    ]);
    plzControl = new FormControl('', []);
    strasseControl = new FormControl('', []);
    wohnortControl = new FormControl('', []);
    homepageControl = new FormControl('', []);
    vornameControl = new FormControl('', []);
    nachnameControl = new FormControl('', []);
    arbeitsortControl = new FormControl('', []);

    activeBlock;
    PERSONAL_BLOCK = 1;
    ADDRESS_BLOCK = 2;
    PITCH_BLOCK = 3;
    QUALIFICATIONS_BLOCK = 4;
    JOB_BLOCK = 5;

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


    constructor(private authService: AuthService, private bewerberService: BewerberService,
                private dropDownDataService: DropDownDataService, private logService: LoggerService,
                private fileService: FileService) {
        this.activeBlock = this.PERSONAL_BLOCK;
        this.user = db.User.me;
        this.bewerber = bewerberService.getNewBewerber();
    }

    ngOnInit() {
        this.bewerberService.getBewerber().then((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
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
        });
        this.dropDownDataService.getSprachen().then((sprachen) => {
            this.sprachen = sprachen;
        });
        this.dropDownDataService.getBerufsfelder().then((berufsfelder) => {
            this.berufsfelder = berufsfelder;
        });
        this.dropDownDataService.getVertragsarten().then((vertragsarten) => {
            this.vertragsarten = vertragsarten;
        });
        this.dropDownDataService.getArbeitsverhaeltnisse().then((arbeitsverhaeltnisse) => {
            this.arbeitsverhaeltnisse = arbeitsverhaeltnisse;
        });
    }

    save() {
        // dropDown-Daten in Sets zurückwandeln
        this.bewerber.vertragsarten = new Set(this.selectedVertragsarten);
        this.bewerber.sprachen = new Set(this.selectedSprachen);

        const pendingFileUploads = this.updateFiles();
        Promise.all(pendingFileUploads).then(() => {
            this.bewerber.profilbild = this.profilbild;
            this.bewerber.lebenslauf = this.lebenslauf;

            this.bewerber.save().then(() => {
                this.logService.logHint('Daten erfolgreich gespeichert.');

                if (!this.user.isConfigCompleted) {
                    this.authService.setNextUserConfigStep();
                }
            }, (error) => {
                this.logService.logError('Fehler beim Speichern: ' + error.message);
            });
        });
    }

    private updateFiles() {
        const pendingFileUploads = [];
        if (this.profilbild !== this.bewerber.profilbild) {
            if (this.bewerber.profilbild) {
                pendingFileUploads.push(this.fileService.deleteFile(this.bewerber.profilbild).then(() => {
                }, (error) => {
                    this.logService.logError(error.message);
                }));
            }
            if (this.profilbild) {
                pendingFileUploads.push(this.fileService.uploadFile(this.profilbild).then(() => {
                }, (error) => {
                    this.logService.logError('Fehler beim Upload des Profilbilds: ' + error.message);
                }));
            }
        }
        if (this.lebenslauf !== this.bewerber.lebenslauf) {
            if (this.bewerber.lebenslauf) {
                pendingFileUploads.push(this.fileService.deleteFile(this.bewerber.lebenslauf).then(() => {
                }, (error) => {
                    this.logService.logError(error.message);
                }));
            }
            if (this.lebenslauf) {
                pendingFileUploads.push(this.fileService.uploadFile(this.lebenslauf).then(() => {
                }, (error) => {
                    this.logService.logError('Fehler beim Upload des Lebenslaufs: ' + error.message);
                }));
            }
        }
        return pendingFileUploads;
    }

    public updateActiveBlock(newBlock) {
        if (this.activeBlock === newBlock) {
            this.activeBlock = null;
        } else {
            this.activeBlock = newBlock;
        }
    }
}
