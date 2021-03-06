import {Injectable} from '@angular/core';
import {db, model} from 'baqend';
import {UnternehmenService} from './unternehmen.service';

/**
 * Stellt die Stellenangebote des eingeloggten Unternehmens bereit.
 */
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
        vacancy.sprache = [];
        vacancy.vertragsarten = [];
        vacancy.unternehmen = null;
        vacancy.befristetesArbeitsverhaeltnis = false;
        return vacancy;
    }
}
