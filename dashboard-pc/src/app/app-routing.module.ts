import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const ROUTES: Routes = [
    { path: '', component: DashboardComponent},
  ];


@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
