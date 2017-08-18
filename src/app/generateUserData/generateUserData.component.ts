import {Component} from '@angular/core';
import {db} from 'baqend';

@Component({
    selector: 'app-generate-user-data',
    templateUrl: './generateUserData.component.html',
})
export class GenerateUserDataComponent {

    logs: string[] = [];

    constructor() {
        let promise1 = Promise.resolve(db.User.load(db.User.me.id));
        let promise2 = Promise.resolve(db.User.load(db.User.me.id));
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
            promise1.then(() => {
                this.logs.push('Registering bewerber ' + bewerber.username + '.');
                promise2 = db.User.register(bewerber, 'passwort', -1);
            }, (error) => {
                this.logs.push(error.message);
            });

            promise2.then(() => {
                this.logs.push('Registering unternehmen ' + unternehmen.username + '.');
                promise1 = db.User.register(unternehmen, 'passwort', -1);
            }, (error) => {
                this.logs.push(error.message);
            });
        }
        console.log(this.logs);
    }
}
