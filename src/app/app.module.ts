import { ComponentsModule } from './components.module';
import { AppRoutingModule } from './app-routing.module';
import { Dashboard } from './../pages/dashboard/dashboard';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login-page';

let components = [
    MyApp,
    LoginPage,
];
@NgModule({
  declarations: [
      ...components,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      ...components,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
 