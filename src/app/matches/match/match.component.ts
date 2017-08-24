import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {db, model} from 'baqend';
import {LoggerService} from '../../logging/logger.service';

@Component({
    templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {

    public match: model.Match;
    public unternehmen: model.Unternehmen;

    constructor(private route: ActivatedRoute, private logService: LoggerService) {
    }

    ngOnInit() {
        const key = this.route.snapshot.params['key'];
        db.Match.load(key, {depth: 1}).then((match) => {
            if (match) {
                this.match = match;
                db.Unternehmen.load(match.angebot.unternehmen.id).then((unternehmen) => {
                        this.unternehmen = unternehmen;
                    }
                );
            }
        }, (error) => {
            this.logService.logError(error.message);
        });
    }
}
