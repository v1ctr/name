import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-config-unternehmen',
    templateUrl: './config-unternehmen.component.html',
})
export class ConfigUnternehmenComponent implements OnInit {

    pitchControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    emailControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    user: model.User;
    unternehmen: model.Unternehmen;
    branchen: model.Berufsfeld[];
    logo: any;
    bild: any;

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
                if (this.unternehmen.bild) {
                    this.bild = this.unternehmen.bild;
                }
            } else {
                this.unternehmen = new db.Unternehmen();
                this.unternehmen.userid = this.user;
            }
        });
    }

    save() {
        var res = this.unternehmen.validate();
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
}
