import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwipeCardsModule} from 'ng2-swipe-cards';
import {CovalentFileModule} from '@covalent/core';
import {AuthService} from './auth.service';
import {RandomGradientDirective} from './random-gradient.directive';
import {
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DB_PROVIDERS} from './db';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './login/forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './login/newPassword/newPassword.component';
import {SwipeBewerberComponent} from './swipe/bewerber/swipe-bewerber.component';
import {SwipeUnternehmenComponent} from './swipe/unternehmen/swipe-unternehmen.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancies/vacancy/vacancy.component';
import {AccloeschenComponent} from './accountLoeschen/accountLoeschen.component';
import {MatchesComponent} from './matches/matches.component';
import {MatchComponent} from './matches/match/match.component';
import {BewerberResolver} from './bewerberResolver';
import {BewerberService} from './bewerberService';
import {VertragsartResolver} from './vertragsartResolver';
import {SprachenResolver} from './sprachenResolver';
import {BerufsfeldResolver} from './berufsfeldResolver';
import {ArbeitsverhaeltnisResolver} from './arbeitsverhaeltnisResolver';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        ConfigUnternehmenComponent,
        ConfigBewerberComponent,
        LoginComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        SwipeBewerberComponent,
        SwipeUnternehmenComponent,
        VacanciesComponent,
        VacancyComponent,
        AccloeschenComponent,
        RandomGradientDirective,
        MatchesComponent,
        MatchComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SwipeCardsModule,
        BrowserAnimationsModule,
        MdToolbarModule,
        MdButtonModule,
        MdInputModule,
        MdMenuModule,
        MdIconModule,
        MdSelectModule,
        MdChipsModule,
        MdListModule,
        CovalentFileModule,
        MdSnackBarModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdCardModule
    ],
    providers: [
        DB_PROVIDERS,
        AuthService,
        BewerberService,
        BewerberResolver,
        VertragsartResolver,
        SprachenResolver,
        BerufsfeldResolver,
        ArbeitsverhaeltnisResolver
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
