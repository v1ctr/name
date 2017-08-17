import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-config-unternehmen',
    templateUrl: './config-unternehmen.component.html',
    styleUrls: ['./config-unternehmen.component.scss']
})
export class ConfigUnternehmenComponent implements OnInit {

    user: model.User;
    unternehmen: model.Unternehmen;
    branchen: model.Berufsfeld[];

    error;

    constructor(private router: Router) {
        this.user = db.User.me;
        if (this.user.iscomp) {
            this.router.navigate(['/config/bewerber']);
        }
        this.unternehmen = new db.Unternehmen();
        db.Berufsfeld.find().resultList((branchen) => {
            this.branchen = branchen;
        });
    }

    ngOnInit() {
        this.user = db.User.me;
        db.Unternehmen.find().equal('userid', this.user).singleResult((unternehmen) => {
            if (unternehmen) {
                this.unternehmen = unternehmen;
            } else {
                this.unternehmen = new db.Unternehmen();
                this.unternehmen.userid = this.user;
            }
        });
    }

    save() {
        this.unternehmen.save();
    }
}
