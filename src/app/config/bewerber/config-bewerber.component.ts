import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-config-bewerber',
    templateUrl: './config-bewerber.component.html',
    styleUrls: ['./config-bewerber.component.scss']
})
export class ConfigBewerberComponent implements OnInit {

    user: model.User;
    bewerber: model.Bewerber;
    vertragsarten: model.Vertragsart[];
    selectedVertragsarten: model.Vertragsart[] = [];
    sprachen: model.Sprache[];
    selectedSprachen: model.Sprache[] = [];
    berufsfelder: model.Berufsfeld[];
    arbeitsverhaeltnisse: model.Arbeitsverhaeltnis[];

    error;

  files: any;
    disabled = false;

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

    constructor(private router: Router) {
        this.user = db.User.me;
        if (this.user.iscomp) {
            this.router.navigate(['/config/unternehmen']);
        }
        this.bewerber = new db.Bewerber();
        db.Vertragsart.find().resultList((vertragsarten) => {
          this.vertragsarten = vertragsarten;
        });
        db.Sprache.find().resultList((sprachen) => {
          this.sprachen = sprachen;
        });
        db.Berufsfeld.find().resultList ((berufsfelder) => {
        this.berufsfelder = berufsfelder;
      });
        db.Arbeitsverhaeltnis.find().resultList((arbeitsverhaeltnisse) => {
          this.arbeitsverhaeltnisse = arbeitsverhaeltnisse;
          });
    }

    ngOnInit() {
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
              console.log(bewerber);
                this.bewerber = bewerber;
                this.bewerber.vertragsarten.forEach((element) => {
                this.selectedVertragsarten.push(element);
              });
              this.bewerber.sprachen.forEach((element) => {
                this.selectedSprachen.push(element);
              });
            } else {
                this.bewerber = new db.Bewerber();
                this.bewerber.user = this.user;
            }
        });
    }

    save() {
        this.bewerber.vertragsarten = new Set(this.selectedVertragsarten);
        this.bewerber.sprachen = new Set (this.selectedSprachen);
        this.bewerber.save();
    }
}
