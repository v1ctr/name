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
    MdChipsModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DB_PROVIDERS} from './db';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './newPassword/newPassword.component';
import {SwipeBewerberComponent} from './swipe/bewerber/swipe-bewerber.component';
import {SwipeUnternehmenComponent} from './swipe/unternehmen/swipe-unternehmen.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancy/vacancy.component';
import {AccloeschenComponent} from './accloeschen/accloeschen.component';
import {GenerateUserDataComponent} from './generateUserData/generateUserData.component';

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
        GenerateUserDataComponent,
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
    ],
    providers: [DB_PROVIDERS, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
