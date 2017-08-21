import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {model} from 'baqend';
import {FormControl, Validators} from '@angular/forms';
import {DropDownDataService} from '../../drop-down-data.service';
import {VacancyService} from '../../vacancy.service';

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

    constructor(private route: ActivatedRoute,
                private dropDownDataService: DropDownDataService,
                private vacancyService: VacancyService) {
        const key = this.route.snapshot.params['key'];
        this.vacancy = this.vacancyService.getVacancyBykey(key);
    }

    ngOnInit() {
        this.sprachen = this.dropDownDataService.getSprachen();
        this.branchen = this.dropDownDataService.getBerufsfelder();
        this.vertragsarten = this.dropDownDataService.getVertragsarten();
        this.selectedVertragsarten = Array.from(this.vacancy.vertragsarten);
        this.selectedSprachen = Array.from(this.vacancy.sprache);
    }

    save() {
        this.vacancy.vertragsarten = new Set(this.selectedVertragsarten);
        this.vacancy.sprache = new Set(this.selectedSprachen);
        this.vacancy.save();
    }
}
