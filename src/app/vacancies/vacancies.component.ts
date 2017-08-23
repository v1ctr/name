import {Component, OnInit} from '@angular/core';
import {model} from 'baqend';
import {VacancyService} from '../_services/vacancy.service';

@Component({
    selector: 'app-vacancies',
    templateUrl: './vacancies.component.html',
})
export class VacanciesComponent implements OnInit {

    vacancies: model.Stellenangebot[] = [];

    constructor(private vacancyService: VacancyService) {
    }

    ngOnInit() {
        this.vacancyService.getVacancies().then((vacancies) => {
            if (vacancies) {
                this.vacancies = vacancies;
            }
        });
    }
}
