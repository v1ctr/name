import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db, model} from 'baqend';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-vacancy',
    templateUrl: './vacancy.component.html',
})
export class VacancyComponent implements OnInit {



    descriptionControl = new FormControl('', [
        Validators.maxLength(100)
    ]);

    anforderungControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    ansprechpartnerControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    arbeitsortControl = new FormControl('', [
        Validators.maxLength(150)
    ]);

    vacancy: model.Stellenangebot;
    vertragsarten: model.Vertragsart[];
    selectedVertragsarten: model.Vertragsart[] = [];
    sprachen: model.Sprache[];
    selectedSprachen: model.Sprache[] = [];
    branchen: model.Berufsfeld[];
    error;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.vacancy = new db.Stellenangebot();
        db.Unternehmen.find().equal('userid', db.User.me).singleResult((unternehmen) => {
            if (unternehmen) {
                this.vacancy.unternehmen = unternehmen;
            }
        });
        this.vacancy.aktiv = true;
        db.Vertragsart.find().resultList((vertragsarten) => {
            this.vertragsarten = vertragsarten;
        });
        db.Sprache.find().resultList((sprachen) => {
            this.sprachen = sprachen;
        });
        db.Berufsfeld.find().resultList((branchen) => {
            this.branchen = branchen;
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
                const key = params['key'];
                db.Stellenangebot.load(key).then((vacancy) => {
                    if (vacancy && key) {
                        this.vacancy = vacancy;
                        this.vacancy.vertragsarten.forEach((element) => {
                            this.selectedVertragsarten.push(element);
                        });
                        this.vacancy.sprache.forEach((sprache) => {
                            this.selectedSprachen.push(sprache);
                        });
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
        this.vacancy.vertragsarten = new Set(this.selectedVertragsarten);
        this.vacancy.sprache = new Set(this.selectedSprachen);
        this.vacancy.save();
    }
}
