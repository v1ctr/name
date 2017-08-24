import {Component, OnInit} from '@angular/core';
import {model} from 'baqend';
import {VacancyService} from '../_services/vacancy.service';
import {LoggerService} from '../logging/logger.service';

/**
 * Diese Komponente stellt eine Übersicht der angelegten Stellenangebote des eingeloggten Unternehmens dar.
 */
@Component({
    templateUrl: './vacancies.component.html',
})
export class VacanciesComponent implements OnInit {

    public vacancies: model.Stellenangebot[] = [];

    constructor(private vacancyService: VacancyService, private logService: LoggerService) {
    }

    ngOnInit() {
        this.vacancyService.getVacancies().then((vacancies) => {
            if (vacancies) {
                this.vacancies = vacancies;
            }
        }, (error) => {
            this.logService.logError(error.message);
        });
    }
}
