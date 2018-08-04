import { Dashboard } from './../pages/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from '../pages/login/login-page';


// MmFormC7Ef_103Component
const routes: Routes = [
    { path: '', component: LoginPage },
    { path: 'dashboard', component: Dashboard },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}