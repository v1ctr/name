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

    error;

  files: any;
    disabled = false;

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

    constructor(private router: Router) {
        this.user = db.User.me;
        this.bewerber = new db.Bewerber();
        db.Vertragsart.find().resultList((vertragsarten) => {
          this.vertragsarten = vertragsarten;
        });
    }

    ngOnInit() {
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
                this.bewerber.vertragsarten.forEach((element) => {
                    this.selectedVertragsarten.push(element);
                });
            } else {
                this.bewerber = new db.Bewerber();
                this.bewerber.user = this.user;
            }
        });
    }

    save() {
        this.bewerber.vertragsarten = new Set(this.selectedVertragsarten);
        this.bewerber.save();
    }
}
