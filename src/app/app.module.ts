import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DB_PROVIDERS} from './db';
import {MeComponent} from './me/me.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ConfigComponent} from './config/config.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {NewPasswordComponent} from './newPassword/newPassword.component';
import {SwipeComponent} from './swipe/swipe.component';

@NgModule({
  declarations: [
    AppComponent,
    MeComponent,
    SignupComponent,
    ConfigComponent,
    LoginComponent,
    ForgotPasswordComponent,
      NewPasswordComponent,
    SwipeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
      AppRoutingModule,
  ],
  providers: [DB_PROVIDERS],
    bootstrap: [AppComponent],
})
export class AppModule { }
