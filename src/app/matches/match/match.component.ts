import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {db, model} from 'baqend';
import {LoggerService} from '../../logging/logger.service';

/**
 * Diese Komponente zeigt einen bestimmten Match an und stellt den Benutzern,
 * die Kontaktinformationen des Gegenübers zur Verfügung.
 */
@Component({
    templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {

    public match: model.Match;

    constructor(private route: ActivatedRoute, private logService: LoggerService) {
    }

    ngOnInit() {
        const key = this.route.snapshot.params['key'];
        db.Match.load(key, {depth: 2}).then((match) => {
            this.match = match;
        }, (error) => {
            this.logService.logError(error.message);
        });
    }
}
