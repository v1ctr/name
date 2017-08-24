import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './authentication/signup/signup.component';
import {LoginComponent} from './authentication/login/login.component';
import {DBLoggedIn, DBNotLoggedIn, DBReady, IsBewerber, IsCompany} from './db';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './authentication/forgotPassword/forgotPassword.component';
import {ResetPasswordComponent} from './authentication/resetPassword/resetPassword.component';
import {SwipeBewerberComponent} from './swipe/bewerber/swipe-bewerber.component';
import {SwipeUnternehmenComponent} from './swipe/unternehmen/swipe-unternehmen.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancies/vacancy/vacancy.component';
import {AccountComponent} from './authentication/account/account.component';
import {MatchesComponent} from './matches/matches.component';
import {MatchComponent} from './matches/match/match.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full', resolve: {db: DBReady}},
    {path: 'swipe/bewerber', component: SwipeBewerberComponent, canActivate: [IsBewerber]},
    {path: 'swipe/unternehmen', component: SwipeUnternehmenComponent, canActivate: [IsCompany]},
    {path: 'signup', component: SignupComponent, resolve: {db: DBReady}, canActivate: [DBNotLoggedIn]},
    {path: 'signup/:email', component: SignupComponent, resolve: {db: DBReady}, canActivate: [DBNotLoggedIn]},
    {path: 'login', component: LoginComponent, resolve: {db: DBReady}, canActivate: [DBNotLoggedIn]},
    {path: 'config/unternehmen', component: ConfigUnternehmenComponent, canActivate: [IsCompany]},
    {path: 'config/bewerber', component: ConfigBewerberComponent, canActivate: [IsBewerber]},
    {path: 'vacancies', component: VacanciesComponent, canActivate: [IsCompany]},
    {path: 'vacancy', component: VacancyComponent, canActivate: [IsCompany]},
    {path: 'vacancy/:key', component: VacancyComponent, canActivate: [IsCompany]},
    {path: 'matches', component: MatchesComponent, canActivate: [DBLoggedIn]},
    {path: 'match/:key', component: MatchComponent, canActivate: [DBLoggedIn]},
    {path: 'forgotPassword', component: ForgotPasswordComponent, resolve: {db: DBReady}, canActivate: [DBNotLoggedIn]},
    {
        path: 'forgotPassword/:email',
        component: ForgotPasswordComponent,
        resolve: {db: DBReady},
        canActivate: [DBNotLoggedIn]
    },
    {path: 'resetPassword', component: ResetPasswordComponent, resolve: {db: DBReady}},
    {path: 'account', component: AccountComponent, canActivate: [DBLoggedIn]},
    {path: '**', redirectTo: 'login', resolve: {db: DBReady}},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

