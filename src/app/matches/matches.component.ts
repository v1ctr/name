import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {BewerberService} from '../bewerber.service';
import {VacancyService} from '../vacancy.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {

    matches: model.Match[] = [];
    // in case no matches exist, user is suggested to go swipe
    swipeLink;

    constructor(private router: Router,
                private bewerberService: BewerberService,
                private vacancyService: VacancyService) {
        if (db.User.me.iscomp) {
            this.swipeLink = '/swipe/unternehmen';
        } else {
            this.swipeLink = '/swipe/bewerber';
        }
    }

    ngOnInit() {
        const matchBuilder = db.Match.find();
        if (db.User.me.iscomp) {
            this.vacancyService.getVacancies().then((vacancies) => {
                matchBuilder.in('angebot', vacancies).resultList({depth: 1}, (matches) => {
                    this.matches = matches;
                });
            });
        } else {
            this.bewerberService.getBewerber().then((bewerber) => {
                matchBuilder.equal('bewerber', bewerber).resultList({depth: 1}, (matches) => {
                    this.matches = matches;
                });
            });
        }
    }
}
