import {Component} from '@angular/core';
import {db} from 'baqend';

@Component({
    selector: 'app-generate-user-data',
    templateUrl: './generateUserData.component.html',
})
export class GenerateUserDataComponent {

    users: any[] = [];

    constructor() {
        for (let i = 1; i <= 4; i++) {
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
            this.users.push(bewerber);
            this.users.push(unternehmen);
        }
        // this.registerUsers(this.users, this.register);
        this.activateUsers();
    }

    private registerUsers(users, fn) {
        let index = 0;

        function next() {
            if (index < users.length) {
                fn(users[index++]).then(next);
            }
        }

        next();
    }

    private activateUsers() {
        db.User.find().matches('username', /^.*@swijo.com$/).resultList((userList) => {
            userList.forEach((user) => {
                user.inactive = false;
                user.save();
            });
        });
    }

    private register(user) {
        return db.User.register(user, 'passwort', -1);
    }
}
