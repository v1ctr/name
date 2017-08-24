import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../_services/drop-down-data.service';
import {UnternehmenService} from '../../_services/unternehmen.service';
import {FileService} from '../../_services/file.service';
import {LoggerService} from '../../logging/logger.service';

@Component({
    templateUrl: './config-unternehmen.component.html',
})
export class ConfigUnternehmenComponent implements OnInit {

    pitchControl = new FormControl('', [
        Validators.maxLength(150)
    ]);
    plzControl = new FormControl('', []);
    strasseControl = new FormControl('', []);
    homepageControl = new FormControl('', []);
    ortControl = new FormControl('', []);
    ansprechpartnerControl = new FormControl('', []);

    activeBlock;
    COMPANY_BLOCK = 1;
    PITCH_BLOCK = 2;
    ADDRESS_BLOCK = 3;

    user: model.User;
    unternehmen: model.Unternehmen;
    branchen: model.Berufsfeld[];
    logo: any;
    bild: any;


    constructor(private authService: AuthService, private dropDownDataService: DropDownDataService,
                private unternehmenService: UnternehmenService, private fileService: FileService,
                private logService: LoggerService) {
        this.activeBlock = this.COMPANY_BLOCK;
        this.user = db.User.me;
        this.unternehmen = this.unternehmenService.getNewUnternehmen();
    }

    ngOnInit() {
        this.unternehmenService.getUnternehmen().then((unternehmen) => {
            if (unternehmen) {
                this.unternehmen = unternehmen;
                if (this.unternehmen.logo) {
                    this.logo = this.unternehmen.logo;
                }
                if (this.unternehmen.bild) {
                    this.bild = this.unternehmen.bild;
                }
            }
        });
        this.dropDownDataService.getBerufsfelder().then((branchen) => {
            this.branchen = branchen;
        });
    }

    save() {
        const pendingFileUploads = this.updateFiles();
        Promise.all(pendingFileUploads).then(() => {
            this.unternehmen.logo = this.logo;
            this.unternehmen.bild = this.bild;
            this.unternehmen.save().then(() => {
                this.logService.logHint('Daten erfolgreich gespeichert.');
                
                if (!this.user.isConfigCompleted) {
                    this.authService.setNextUserConfigStep();
                }
            });
        }, (error) => {
            this.logService.logError('Fehler beim Speichern: ' + error.message);
        });
    }

    private updateFiles() {
        const pendingFileUploads = [];
        if (this.logo !== this.unternehmen.logo) {
            if (this.unternehmen.logo) {
                pendingFileUploads.push(this.fileService.deleteFile(this.unternehmen.logo).then(() => {
                }, (error) => {
                    this.logService.logError(error.message);
                }));
            }
            if (this.logo) {
                pendingFileUploads.push(this.fileService.uploadFile(this.logo).then(() => {
                }, (error) => {
                    this.logService.logError('Fehler beim Upload des Logos: ' + error.message);
                }));
            }
        }
        if (this.bild !== this.unternehmen.bild) {
            if (this.unternehmen.bild) {
                pendingFileUploads.push(this.fileService.deleteFile(this.unternehmen.bild).then(() => {
                }, (error) => {
                    this.logService.logError(error.message);
                }));
            }
            if (this.bild) {
                pendingFileUploads.push(this.fileService.uploadFile(this.bild).then(() => {
                }, (error) => {
                    this.logService.logError('Fehler beim Upload des Bilds: ' + error.message);
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
