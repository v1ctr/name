import {Component} from '@angular/core';
import {db, model} from 'baqend';

@Component({
    selector: 'app-generate-user-data',
    templateUrl: './generateUserData.component.html',
})
export class GenerateUserDataComponent {

    logs: string[] = [];

    constructor() {
        for (let i = 1; i <= 1; i++) {
            const bewerber = new db.User({
                username: 'bewerber' + i + '@swijo.com',
                iscomp: false,
                isConfigCompleted: false,
            });
            const unternehmen = new db.User({
                username: 'company' + i + '@swijo.com',
                iscomp: true,
                isConfigCompleted: false,
            });
            setTimeout(this.register(bewerber), 5000);
            setTimeout(this.register(unternehmen), 5000);
            console.log(this.logs);
        }
    }

    register(user: model.User) {
        db.User.register(user, 'passwort', -1).then(() => {
            this.logs.push('Registered user ' + user.username + '.');
        }, (error) => {
            this.logs.push(error.message);
        });
    }
}
