import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {

    matches: model.Match[] = [];
    redirectLink;

    constructor(private router: Router) {
        if (db.User.me.iscomp) {
            this.redirectLink = '/swipe/unternehmen';
        } else {
            this.redirectLink = '/swipe/bewerber';
        }
    }

    ngOnInit() {
        if(db.User.me.iscomp){
            db.Unternehmen.find()
                .equal('userid', db.User.me)
                .singleResult((unternehmen)=>{
                    if(unternehmen){
                        db.Stellenangebot.find()
                            .equal('unternehmen', unternehmen)
                            .resultList((angebote)=>{
                                db.Match.find()
                                    .in('angebot', angebote)
                                    .resultList({depth: 1}, (matches)=>{
                                        this.matches = matches;
                                    });
                            });
                    }
                })
        } else {
            db.Bewerber.find()
                .equal('user', db.User.me)
                .singleResult((bewerber)=>{
                    if(bewerber){
                        db.Match.find()
                            .equal('bewerber', bewerber)
                            .resultList({depth: 1}, (matches)=>{
                                this.matches = matches;
                            });
                    }
                });
        }
        /*
        db.Stellenangebot.find().resultList((result) => {
            this.vacancies = result;
        });
        */
    }
}
