import {Component} from '@angular/core';
import {db} from 'baqend';

@Component({
    selector: 'app-generate-user-data',
    templateUrl: './generateUserData.component.html',
})
export class GenerateUserDataComponent {

    logs: string[] = [];

    constructor() {
        let promise;
        for (let i = 3; i <= 4; i++) {
            const bewerber = new db.User({
                username: 'bewerber' + i + '@swijo.com',
                inactive: true,
                iscomp: false,
                isConfigCompleted: false,
            });
            const unternehmen = new db.User({
                username: 'company' + i + '@swijo.com',
                inactive: true,
                iscomp: true,
                isConfigCompleted: false,
            });
            if (promise) {
                promise.then(() => {
                    this.logs.push('Registering bewerber ' + bewerber.username + '.');
                    promise = db.User.register(bewerber, 'passwort', -1);
                }, (error) => {
                    this.logs.push(error.message);
                });
            } else {
                this.logs.push('Registering bewerber ' + bewerber.username + '.');
                promise = db.User.register(bewerber, 'passwort', -1);
            }
            promise.then(() => {
                this.logs.push('Registering unternehmen ' + unternehmen.username + '.');
                promise = db.User.register(unternehmen, 'passwort', -1);
            }, (error) => {
                this.logs.push(error.message);
            });
        }
        console.log(this.logs);
    }
}
