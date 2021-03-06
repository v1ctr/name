import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwipeCardsModule} from 'ng2-swipe-cards';
import {CovalentFileModule} from '@covalent/core';
import {AuthService} from './_services/auth.service';
import {CardService} from './_services/card.service';
import {MatchService} from './_services/match.service';
import {
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DB_PROVIDERS} from './db';
import {SignupComponent} from './authentication/signup/signup.component';
import {LoginComponent} from './authentication/login/login.component';
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
import {BewerberService} from './_services/bewerber.service';
import {DropDownDataService} from './_services/drop-down-data.service';
import {VacancyService} from './_services/vacancy.service';
import {UnternehmenService} from './_services/unternehmen.service';
import {LoggerComponent} from './logging/logger.component';
import {LoggerService} from './logging/logger.service';
import {FileService} from './_services/file.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        ConfigUnternehmenComponent,
        ConfigBewerberComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SwipeBewerberComponent,
        SwipeUnternehmenComponent,
        VacanciesComponent,
        VacancyComponent,
        AccountComponent,
        MatchesComponent,
        MatchComponent,
        LoggerComponent
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
        MdCardModule,
        MdCheckboxModule,
        MdTabsModule
    ],
    providers: [
        DB_PROVIDERS,
        AuthService,
        BewerberService,
        DropDownDataService,
        VacancyService,
        UnternehmenService,
        CardService,
        MatchService,
        LoggerService,
        FileService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
