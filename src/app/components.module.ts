import { Dashboard } from './../pages/dashboard/dashboard';
import { IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        Dashboard,
    ],
    imports: [
        BrowserModule,
        IonicModule
        
    ],
    exports: [
        Dashboard,
    ]
})
export class ComponentsModule { }
