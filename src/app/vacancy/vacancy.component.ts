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
        if (!db.User.me.iscomp) {
            this.router.navigate(['/swipe']);
        } else {
            this.vacancy = new db.Stellenangebot();
            this.vacancy.userid = db.User.me;
            this.vacancy.aktiv = true;
        }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
                const key = params['key'];
                db.Stellenangebot.load(key).then((vacancy) => {
                    if (vacancy && key) {
                        this.vacancy = vacancy;
                    } else if (key) {
                        this.error = 'Could not load vacancy with key "' + key + '".';
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