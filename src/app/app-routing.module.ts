import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {DBLoggedIn, DBReady} from './db';
import {MeComponent} from './me/me.component';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './newPassword/newPassword.component';
import {BewerberprofilComponent} from './bewerberprofil/bprofil.component';
import {SwipeBewerberComponent} from './swipe/bewerber/swipe-bewerber.component';
import {SwipeUnternehmenComponent} from './swipe/unternehmen/swipe-unternehmen.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancy/vacancy.component';

const routes: Routes = [
    {path: '', redirectTo: '/swipe', pathMatch: 'full', resolve: {db: DBReady}}, // redirect to signup page
    {path: 'swipe/bewerber', component: SwipeBewerberComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'swipe/unternehmen', component: SwipeUnternehmenComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'signup', component: SignupComponent, resolve: {db: DBReady}}, // will activate the route after the db is ready
    {path: 'login', component: LoginComponent, resolve: {db: DBReady}}, // will activate the route after the db is ready
    {path: 'config/unternehmen', component: ConfigUnternehmenComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'config/bewerber', component: ConfigBewerberComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'vacancies', component: VacanciesComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'vacancy', component: VacancyComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'vacancy/:key', component: VacancyComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'signup/me', component: MeComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'forgotPassword', component: ForgotPasswordComponent, resolve: {db: DBReady}},
    {path: 'forgotPassword/:email', component: ForgotPasswordComponent, resolve: {db: DBReady}},
    {path: 'resetPassword', component: NewPasswordComponent, resolve: {db: DBReady}},
    {path: 'bewerberprofil', component: BewerberprofilComponent, canActivate: [DBLoggedIn]}, // will activate the route after the db is ready
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
