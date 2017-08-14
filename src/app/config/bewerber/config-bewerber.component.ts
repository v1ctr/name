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
    selectedVertragsarten: string[];

    error;

  files: any;
  disabled: boolean = false;

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

    constructor(private router: Router) {
        this.user = db.User.me;
        this.bewerber = new db.Bewerber();
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                this.bewerber = new db.Bewerber();
                this.bewerber.user = this.user;
            }
        });
        db.Vertragsart.find().resultList((vertragsarten) => {
          this.vertragsarten = vertragsarten;
        });
    }

    ngOnInit() {
        this.user = db.User.me;
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                this.bewerber = new db.Bewerber();
                this.bewerber.user = this.user;
            }
        });
    }

    save() {
        this.bewerber.vertragsarten = new db.Set(this.selectedVertragsarten);
        this.bewerber.save();
    }
}
