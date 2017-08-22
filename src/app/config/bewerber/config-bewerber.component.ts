import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-config-bewerber',
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

    plzControl = new FormControl('', [

    ]);

    vornameControl = new FormControl('', [

    ]);

    wohnortControl = new FormControl('', [

    ]);
    nachnameControl = new FormControl('', [

    ]);

    arbeitsortControl = new FormControl('', [

        ]);

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


    constructor(private authService: AuthService) {
        this.user = db.User.me;
        this.bewerber = new db.Bewerber();
    }

    ngOnInit() {
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                const newBewerber = new db.Bewerber();
                newBewerber.user = this.user;
                newBewerber.vertragsarten = [];
                newBewerber.sprachen = [];
                this.bewerber = newBewerber;
            }
        });
        db.Vertragsart.find().resultList((vertragsarten) => {
            this.vertragsarten = vertragsarten;
        });
        db.Berufsfeld.find().resultList((berufsfelder) => {
            this.berufsfelder = berufsfelder;
        });
        db.Sprache.find().resultList((sprachen) => {
            this.sprachen = sprachen;
        });
        db.Arbeitsverhaeltnis.find().resultList((arbeitsverhaeltnisse) => {
            this.arbeitsverhaeltnisse = arbeitsverhaeltnisse;
        });
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
        this.bewerber.vertragsarten = new Set(this.selectedVertragsarten);
        this.bewerber.sprachen = new Set(this.selectedSprachen);
        const pendingFileUploads = [];
        if (this.profilbild) {
            const image = new db.File({
                name: this.getFilePath() + this.profilbild.name,
                data: this.profilbild,
                type: 'blob'
            });
            pendingFileUploads.push(image.upload({force: true}).then(() => {
                this.bewerber.profilbild = image;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.bewerber.profilbild) {
            const image = new db.File(this.bewerber.profilbild);
            pendingFileUploads.push(image.delete({force: true}).then(() => {
                this.bewerber.profilbild = null;
            }));
        }
        if (this.lebenslauf) {
            const CV = new db.File({
                name: this.getFilePath() + this.lebenslauf.name,
                data: this.lebenslauf,
                type: 'blob'
            });
            pendingFileUploads.push(CV.upload({force: true}).then(() => {
                this.bewerber.lebenslauf = CV;
            }, (error) => {
                this.errors.push(error.message);
            }));
        } else if (this.bewerber.lebenslauf) {
            const CV = new db.File(this.bewerber.lebenslauf);
            // @todo delete funktioniert noch nicht
            pendingFileUploads.push(CV.delete({force: true}).then(() => {
                this.bewerber.lebenslauf = null;
            }));
        }
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

    private getFilePath(): string {
        return 'users/' + this.user.key + '/';
    }
}
