import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {UnternehmenService} from './unternehmen.service';

@Injectable()
export class VacancyService {

    constructor(private unternehmenService: UnternehmenService) {
    }

    public getVacancies(): Promise<model.Stellenangebot[]> {
        return this.unternehmenService.getUnternehmen().then((unternehmen) => {
            return db.Stellenangebot.find().equal('unternehmen', unternehmen).resultList().then((vacancies) => {
                return vacancies;
            });
        });
    }

    public getVacancyByKey(key: string): Promise<model.Stellenangebot> {
        return db.Stellenangebot.load(key);
    }

    public getNewVacancy(): model.Stellenangebot {
        const vacancy = new db.Stellenangebot();
        vacancy.aktiv = true;
        vacancy.sprachen = [];
        vacancy.vertragsarten = [];
        return vacancy;
    }
}
