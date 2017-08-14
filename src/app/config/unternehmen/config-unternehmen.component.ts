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

    error;

    constructor(private router: Router) {
        this.user = db.User.me;
        this.unternehmen = new db.Unternehmen();
        db.Unternehmen.find().equal('userid', this.user).singleResult((unternehmen) => {
            if (unternehmen) {
                this.unternehmen = unternehmen;
            } else {
                this.unternehmen = new db.Unternehmen();
                this.unternehmen.userid = this.user;
            }
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
