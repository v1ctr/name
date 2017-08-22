import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwipeCardsModule} from 'ng2-swipe-cards';
import {CovalentFileModule} from '@covalent/core';
import {AuthService} from './auth.service';
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
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './login/forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './login/newPassword/newPassword.component';
import {ChangePasswordComponent} from './changepass/changepass.component';
import {SwipeBewerberComponent} from './swipe/bewerber/swipe-bewerber.component';
import {SwipeUnternehmenComponent} from './swipe/unternehmen/swipe-unternehmen.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancies/vacancy/vacancy.component';
import {AccloeschenComponent} from './accountLoeschen/accountLoeschen.component';
import {MatchesComponent} from './matches/matches.component';
import {MatchComponent} from './matches/match/match.component';
import {BewerberService} from './bewerber.service';
import {DropDownDataService} from './drop-down-data.service';
import {VacancyService} from './vacancy.service';
import {UnternehmenService} from './unternehmen.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        ConfigUnternehmenComponent,
        ConfigBewerberComponent,
        LoginComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        ChangePasswordComponent,
        SwipeBewerberComponent,
        SwipeUnternehmenComponent,
        VacanciesComponent,
        VacancyComponent,
        AccloeschenComponent,
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
