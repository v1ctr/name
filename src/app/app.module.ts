import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwipeCardsModule} from 'ng2-swipe-cards';
import {
    MdButtonModule,
    MdChipsModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSelectModule,
    MdToolbarModule,
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DB_PROVIDERS} from './db';
import {MeComponent} from './me/me.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ConfigUnternehmenComponent} from './config/unternehmen/config-unternehmen.component';
import {ConfigBewerberComponent} from './config/bewerber/config-bewerber.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './newPassword/newPassword.component';
import {SwipeComponent} from './swipe/swipe.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacancyComponent} from './vacancy/vacancy.component';
import {BewerberprofilComponent} from './bewerberprofil/bprofil.component';

@NgModule({
    declarations: [
        AppComponent,
        MeComponent,
        SignupComponent,
        ConfigUnternehmenComponent,
        ConfigBewerberComponent,
        LoginComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        SwipeComponent,
        VacanciesComponent,
        VacancyComponent,
        BewerberprofilComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
        MdChipsModule

    ],
    providers: [DB_PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule {
}
