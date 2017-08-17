import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';
import {AuthService} from '../../auth.service';

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

    constructor(private router: Router, private authService: AuthService) {
        this.user = db.User.me;
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
        this.unternehmen.save().then(() => {
            if (!this.user.isConfigCompleted) {
                this.user.isConfigCompleted = true;
                this.user.save().then(() => {
                    this.authService.isConfigCompleteSubject.next(true);
                });
            }
        });
    }
}
