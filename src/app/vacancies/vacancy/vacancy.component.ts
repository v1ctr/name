import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db, model} from 'baqend';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../drop-down-data.service';

@Component({
    selector: 'app-vacancy',
    templateUrl: './vacancy.component.html',
})
export class VacancyComponent implements OnInit {

    descriptionControl = new FormControl('', [
        Validators.maxLength(100)
    ]);

    anforderungControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    vacancy: model.Stellenangebot;
    vertragsarten: model.Vertragsart[];
    selectedVertragsarten: model.Vertragsart[] = [];
    sprachen: model.Sprache[];
    selectedSprachen: model.Sprache[] = [];
    branchen: model.Berufsfeld[];
    error;

    constructor(private router: Router, private route: ActivatedRoute, private dropDownDataService: DropDownDataService) {
        this.vacancy = new db.Stellenangebot();
        db.Unternehmen.find().equal('userid', db.User.me).singleResult((unternehmen) => {
            if (unternehmen) {
                this.vacancy.unternehmen = unternehmen;
                this.vacancy.aktiv = true;
            }
        });
    }

    ngOnInit() {
        this.sprachen = this.dropDownDataService.getSprachen();
        this.branchen = this.dropDownDataService.getBerufsfelder();
        this.vertragsarten = this.dropDownDataService.getVertragsarten();
        const key = this.route.snapshot.data['key'];
        if (key) {
            db.Stellenangebot.load(key).then((vacancy) => {
                if (vacancy) {
                    this.vacancy = vacancy;
                    this.selectedVertragsarten = Array.from(this.vacancy.vertragsarten);
                    this.selectedSprachen = Array.from(this.vacancy.sprache);
                } else {
                    this.error = 'Could not load vacancy with key "' + key + '".';
                }
            });
        }
    }

    save() {
        this.vacancy.vertragsarten = new Set(this.selectedVertragsarten);
        this.vacancy.sprache = new Set(this.selectedSprachen);
        this.vacancy.save();
    }
}
