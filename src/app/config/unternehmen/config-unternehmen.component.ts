import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../drop-down-data.service';
import {UnternehmenService} from '../../unternehmen.service';

@Component({
    selector: 'app-config-unternehmen',
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

    errors;

    constructor(private authService: AuthService,
                private dropDownDataService: DropDownDataService,
                private unternehmenService: UnternehmenService,) {
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
        const res = this.unternehmen.validate();
        console.log(res);
        const pendingFileUploads = [];
        if (this.logo) {
            const image = new db.File({
                name: this.getFilePath() + this.logo.name,
                data: this.logo,
                type: 'blob',
            });
            pendingFileUploads.push(image.upload({force: true}).then(() => {
                this.unternehmen.logo = image;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.unternehmen.logo) {
            const image = new db.File(this.unternehmen.logo);
            pendingFileUploads.push(image.delete({force: true}).then(() => {
                this.unternehmen.logo = null;
            }));
        }
        if (this.bild) {
            const image = new db.File({
                name: this.getFilePath() + this.bild.name,
                data: this.bild,
                type: 'blob',
            });
            pendingFileUploads.push(image.upload({force: true}).then(() => {
                this.unternehmen.bild = image;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.unternehmen.bild) {
            const image = new db.File(this.unternehmen.bild);
            pendingFileUploads.push(image.delete({force: true}).then(() => {
                this.unternehmen.bild = null;
            }));
        }
        Promise.all(pendingFileUploads).then(() => {
            this.unternehmen.save().then(() => {
                if (!this.user.isConfigCompleted) {
                    this.user.isConfigCompleted = true;
                    this.user.save().then(() => {
                        this.authService.isConfigCompleteSubject.next(true);
                    });
                }
            });
        }, (error) => {
            this.errors.push(error.message);
        });
    }

    private getFilePath(): string {
        return 'users/' + this.user.key + '/';
    }

    private updateActiveBlock(newBlock) {
        if (this.activeBlock === newBlock) {
            this.activeBlock = null;
        } else {
            this.activeBlock = newBlock;
        }
    }
}
