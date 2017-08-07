import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DB_PROVIDERS } from './db';
import { MeComponent } from './me/me.component';
import { SignupComponent } from './signup/signup.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MeComponent,
    SignupComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DB_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
