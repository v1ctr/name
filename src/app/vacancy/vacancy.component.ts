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
        this.route.params.subscribe(params => {
                const id = params['id'];
                db.Stellenangebot.find().equal('id', id).singleResult(
                    (vacancy) => {
                        if (vacancy) {
                            this.vacancy = vacancy;
                        } else {
                            this.error = 'Could not load vacancy with id "' + id + '".';
                        }
                    }
                )
            },
            (error) => {
                this.error = error.message;
            });
    }

    save() {
        this.vacancy.update();
    }
}
