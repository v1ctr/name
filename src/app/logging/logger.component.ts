import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoggerService} from './logger.service';

/**
 * Diese LoggerKomponente ist global unterhalb des Main-RouterOutlets eingebunden, um dem Benutzer Feedback zu geben.
 */
@Component({
    'selector': 'app-logger',
    'templateUrl': './logger.component.html'
})
export class LoggerComponent {

    public errors: Observable<string[]>;
    public hints: Observable<string[]>;

    constructor(private loggerService: LoggerService) {
        this.errors = this.loggerService.getErrors();
        this.hints = this.loggerService.getHints();
    }
}
