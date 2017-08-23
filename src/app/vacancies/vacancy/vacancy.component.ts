import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {model} from 'baqend';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../drop-down-data.service';
import {VacancyService} from '../../vacancy.service';
import {UnternehmenService} from '../../unternehmen.service';

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
    ansprechpartnerControl = new FormControl('', [
        Validators.maxLength(150)
    ]);
    arbeitsortControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    vacancy: model.Stellenangebot;
    vertragsarten: model.Vertragsart[];
    selectedVertragsarten: model.Vertragsart[] = [];
    sprachen: model.Sprache[];
    selectedSprachen: model.Sprache[] = [];
    branchen: model.Berufsfeld[];
    error;

    constructor(private route: ActivatedRoute,
                private dropDownDataService: DropDownDataService,
                private vacancyService: VacancyService,
                private unternehmenService: UnternehmenService) {
        this.vacancy = vacancyService.getNewVacancy();
    }

    ngOnInit() {
        this.dropDownDataService.getSprachen().then((sprachen) => {
            this.sprachen = sprachen;
        });
        this.dropDownDataService.getBerufsfelder().then((branchen) => {
            this.branchen = branchen;
        });
        this.dropDownDataService.getVertragsarten().then((vertragsarten) => {
            this.vertragsarten = vertragsarten;
        });
        const key = this.route.snapshot.params['key'];
        if (key) {
            this.vacancyService.getVacancyByKey(key).then((vacancy) => {
                this.vacancy = vacancy;
                this.selectedVertragsarten = Array.from(this.vacancy.vertragsarten);
                this.selectedSprachen = Array.from(this.vacancy.sprache);
            });
        }
    }

    save() {
        this.vacancy.vertragsarten = new Set(this.selectedVertragsarten);
        this.vacancy.sprache = new Set(this.selectedSprachen);
        if (this.vacancy.befristetesArbeitsverhaeltnis === null) {
            this.vacancy.befristetesArbeitsverhaeltnis = false;
        }
        if (this.vacancy.unternehmen === null) {
            this.unternehmenService.getUnternehmen().then((unternehmen) => {
                this.vacancy.unternehmen = unternehmen;
                this.vacancy.save();
            });
        } else {
            this.vacancy.save();
        }
    }
}
