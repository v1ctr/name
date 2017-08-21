import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {UnternehmenService} from './unternehmen.service';

@Injectable()
export class VacancyService {

    private vacancies: model.Stellenangebot[] = [];
    private unternehmen: model.Unternehmen;

    constructor(private unternehmenService: UnternehmenService) {
        this.unternehmen = this.unternehmenService.getUnternehmen();
        db.Stellenangebot.find().equal('unternehmen', this.unternehmen).resultList((vacancies) => {
            if (vacancies) {
                this.vacancies = vacancies;
            }
        });
    }

    public getVacancies(): model.Stellenangebot[] {
        return this.vacancies;
    }

    public getVacancyBykey(key: string): model.Stellenangebot {
        const foundVacancy = this.vacancies.find(vacancy => vacancy.key === key);
        if (foundVacancy) {
            return foundVacancy;
        } else {
            return this.getNewVacancy();
        }
    }

    public getNewVacancy(): model.Stellenangebot {
        const vacancy = new db.Stellenangebot();
        vacancy.unternehmen = this.unternehmen;
        vacancy.aktiv = true;
        vacancy.sprachen = [];
        vacancy.vertragsarten = [];
        return vacancy;
    }
}
