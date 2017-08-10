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
        this.vacancy = new db.Stellenangebot();
        this.vacancy.userid = db.User.me.id; // @todo funzt nicht
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
                const key = params['key'];
                const self = this;
                db.Stellenangebot.load(key).then(function (vacancy) {
                    if (vacancy && key) {
                        self.vacancy = vacancy;
                    } else if (key) {
                        self.error = 'Could not load vacancy with key "' + key + '".';
                    }
                });
            },
            (error) => {
                this.error = error.message;
            });
    }

    save() {
        this.vacancy.save();
    }
}
