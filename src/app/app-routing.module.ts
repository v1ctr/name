import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {DBLoggedIn, DBReady} from './db';
import {MeComponent} from './me/me.component';
import {ConfigComponent} from './config/config.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full', resolve: { db: DBReady }}, // redirect to signup page
  { path: 'signup', component: SignupComponent, resolve: { db: DBReady } }, // will activate the route after the db is ready
  { path: 'login', component: LoginComponent, resolve: { db: DBReady } }, // will activate the route after the db is ready
  { path: 'config', component: ConfigComponent, resolve: { db: DBReady } }, // will activate the route after the db is ready
  { path: 'signup/me', component: MeComponent, canActivate: [DBLoggedIn] }, // will prevent none logged in users from accessing it
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
