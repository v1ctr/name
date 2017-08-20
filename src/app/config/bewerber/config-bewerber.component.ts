import {Component} from '@angular/core';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-config-bewerber',
    templateUrl: './config-bewerber.component.html',
})
export class ConfigBewerberComponent {

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
        this.vertragsarten = this.route.snapshot.data['vertragsarten'];
        this.sprachen = this.route.snapshot.data['sprachen'];
        this.berufsfelder = this.route.snapshot.data['berufsfelder'];
        this.arbeitsverhaeltnisse = this.route.snapshot.data['arbeitsverhaeltnisse'];
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
