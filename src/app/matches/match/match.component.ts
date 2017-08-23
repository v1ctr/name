import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {

    match: model.Match;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const key = this.route.snapshot.params['key'];
        db.Match.load(key, {depth: 2}).then((match) => {
            if (match) {
                this.match = match;
            }
        });
    }
}
