import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BuybookPage } from '../pages/buybook/buybook';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SellbookPage } from '../pages/sellbook/sellbook';
import { DetallePage } from '../pages/detalle/detalle';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { AccountPage } from '../pages/account/account'
import { AuthService } from '../providers/auth-service';

import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { Http, HttpModule } from "@angular/http";


import * as firebase from 'firebase';


@NgModule({
  declarations: [
    MyApp,
    BuybookPage,
    ContactPage,
    HomePage,
    SellbookPage,
    DetallePage,
    TabsPage,
    LoginPage,
    SigninPage,
    AccountPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot(
      {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BuybookPage,
    ContactPage,
    HomePage,
    SellbookPage,
    DetallePage,
      TabsPage,
    LoginPage,
    SigninPage,
    AccountPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
