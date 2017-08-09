import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {DBLoggedIn, DBReady} from './db';
import {MeComponent} from './me/me.component';
import {ConfigComponent} from './config/config.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {SwipeComponent} from './swipe/swipe.component';
import {NewPasswordComponent} from './newPassword/newPassword.component';

const routes: Routes = [
    {path: '', redirectTo: '/swipe', pathMatch: 'full', resolve: {db: DBReady}}, // redirect to signup page
    {path: 'swipe', component: SwipeComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'signup', component: SignupComponent, resolve: {db: DBReady}}, // will activate the route after the db is ready
    {path: 'login', component: LoginComponent, resolve: {db: DBReady}}, // will activate the route after the db is ready
    {path: 'config', component: ConfigComponent, canActivate: [DBLoggedIn]}, // will activate the route after the db is ready
    {path: 'signup/me', component: MeComponent, canActivate: [DBLoggedIn]}, // will prevent none logged in users from accessing it
    {path: 'forgotPassword', component: ForgotPasswordComponent, resolve: {db: DBReady}},
    {path: 'forgotPassword/:email', component: ForgotPasswordComponent, resolve: {db: DBReady}},
    {path: 'resetPassword', component: NewPasswordComponent, resolve: {db: DBReady}},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
