import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { model, db } from 'baqend';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    user: model.User;
    error;

    constructor(private router: Router) {
        this.router.navigate(['/profile']);
    }

    saveProfile() {
        this.user.insert();
    }
}
