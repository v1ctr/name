import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {

    vacancy: model.Stellenangebot;
    error;

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {

        let id = '';
        this.route.params.subscribe( (params) => {
            id = params['id'];
        });
        db.Stellenangebot.find().equal('uid', id).singleResult(
            (vacancy) => {
                if (!vacancy) {
                    this.error = 'Could not load vacancy with id "' + id + '".';
                } else {
                    this.vacancy = vacancy;
                }
            }
        );

    }

    save() {
        this.vacancy.update();
    }
}
