import {Component, OnInit} from '@angular/core';
import {model} from 'baqend';
import {VacancyService} from '../vacancy.service';

@Component({
    selector: 'app-vacancies',
    templateUrl: './vacancies.component.html',
})
export class VacanciesComponent implements OnInit {

    vacancies: model.Stellenangebot[] = [];

    constructor(private vacancyService: VacancyService) {
    }

    ngOnInit() {
        this.vacancies = this.vacancyService.getVacancies();
    }
}
