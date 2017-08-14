import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-bewerberprofil',
    templateUrl: './bprofil.component.html',
    styleUrls: ['./bprofil.component.scss']
})
export class BewerberprofilComponent implements OnInit {

    user: model.User;
    bewerber: model.Bewerber;

    constructor(private router: Router) {
        this.user = db.User.me;
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                this.router.navigate(['/bewerberprofil'])
            }
        });
    }


  getImageUrl(user) {
    return new db.File(user.profilbild).url;
  }

    ngOnInit() {
        this.user = db.User.me;
        db.Bewerber.find().equal('user', this.user).singleResult((bewerber) => {
            if (bewerber) {
                this.bewerber = bewerber;
            } else {
                this.router.navigate(['/bewerberprofil']);
            }
        });
    }

}
