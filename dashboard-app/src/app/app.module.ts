import { ComponentsModule } from './components.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler, IonicApp } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login-page';
import {HttpClientModule} from '@angular/common/http';

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
    HttpClientModule,
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
 