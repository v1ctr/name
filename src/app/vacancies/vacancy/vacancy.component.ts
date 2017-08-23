import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {model} from 'baqend';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../_services/drop-down-data.service';
import {VacancyService} from '../../_services/vacancy.service';
import {UnternehmenService} from '../../_services/unternehmen.service';
import {LoggerService} from '../../logging/logger.service';

@Component({
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

    constructor(private route: ActivatedRoute,
                private dropDownDataService: DropDownDataService,
                private vacancyService: VacancyService,
                private unternehmenService: UnternehmenService,
                private logService: LoggerService) {
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
            }, (error) => {
                this.logService.logError(error.message);
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
                this.vacancy.save().then(() => {
                    this.logService.logHint('Stellenangebot erfolgreich gespeichert.');
                }, (error) => {
                    this.logService.logError('Fehler beim Speichern. ' + error.message);
                });
            });
        } else {
            this.vacancy.save().then(() => {
                this.logService.logHint('Stellenangebot erfolgreich gespeichert.');
            }, (error) => {
                this.logService.logError('Fehler beim Speichern. ' + error.message);
            });
        }
    }
}
