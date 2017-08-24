import {Component, OnInit} from '@angular/core';
import {db, model} from 'baqend';
import {BewerberService} from '../_services/bewerber.service';
import {VacancyService} from '../_services/vacancy.service';

/**
 * Zeigt dem Benutzer die bisherigen Matches an, oder eine Nachricht, das noch keine Matches vorliegen.
 */
@Component({
    templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {

    public matches: model.Match[] = [];
    // in case no matches exist, user is suggested to go swipe
    public swipeLink;

    constructor(private bewerberService: BewerberService, private vacancyService: VacancyService) {
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
