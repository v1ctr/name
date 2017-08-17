import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-config-unternehmen',
    templateUrl: './config-unternehmen.component.html',
    styleUrls: ['./config-unternehmen.component.scss']
})
export class ConfigUnternehmenComponent implements OnInit {

    user: model.User;
    unternehmen: model.Unternehmen;
    branchen: model.Berufsfeld[];
    logo: any;
    bilder: any[];
    bildernamen: string[];

    errors;

    constructor(private router: Router, private authService: AuthService) {
        this.user = db.User.me;
        this.unternehmen = new db.Unternehmen();
        db.Berufsfeld.find().resultList((branchen) => {
            this.branchen = branchen;
        });
    }

    ngOnInit() {
        this.user = db.User.me;
        db.Unternehmen.find().equal('userid', this.user).singleResult((unternehmen) => {
            if (unternehmen) {
                this.unternehmen = unternehmen;
                if (this.unternehmen.logo) {
                    this.logo = this.unternehmen.logo;
                }
                if (this.unternehmen.bilder) {
                    this.unternehmen.bilder.forEach((bild) => {
                        const file = new db.File(bild);
                        this.bildernamen.push(file.name);
                        this.bilder.push(bild);
                    });
                }
            } else {
                this.unternehmen = new db.Unternehmen();
                this.unternehmen.userid = this.user;
            }
        });
    }

    save() {
        const pendingFileUploads = [];
        if (this.logo) {
            const image = new db.File({
                name: this.getFilePath() + this.logo.name,
                data: this.logo,
                type: 'blob'
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
        if (this.bilder) {
            this.bilder.forEach((bild) => {
                const image = new db.File({
                    name: this.getFilePath() + bild.name,
                    data: bild,
                    type: 'blob'
                });
                pendingFileUploads.push(image.upload({force: true}).then(() => {
                    // @todo nur hinzufügen, falls neu
                    this.unternehmen.bilder.push(image);
                }, (error) => {
                    this.errors.push(error.message);
                }));
            });
        }
        // @todo delete removed files
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

    updateBildernamen() {
        this.bildernamen = [];
        this.bilder.forEach((bild) => {
            this.bildernamen.push(bild.name);
        })
    }
}
