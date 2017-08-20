import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-vacancies',
    templateUrl: './vacancies.component.html',
})
export class VacanciesComponent implements OnInit {

    vacancies: model.Stellenangebot[] = [];

    constructor(private router: Router) {
    }

    ngOnInit() {
        db.Unternehmen.find().equal('userid', db.User.me).singleResult((unternehmen) => {
            db.Stellenangebot.find().equal('unternehmen', unternehmen).resultList((result) => {
                if (result && result.length > 0) {
                    this.vacancies = result;
                }
            });
        });
    }
}
