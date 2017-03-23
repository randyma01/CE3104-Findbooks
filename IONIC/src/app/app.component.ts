import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AlertController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { LoadingController } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage;
  

  constructor(platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public translate: TranslateService) {
     let language = this.alertCtrl.create();
     language.addInput({
      type: 'radio',
      label: 'EN',
      value: '1'
    });
    language.addInput({
      type: 'radio',
      label: 'ES',
      value: '2'
    });
    language.addButton({
      text: 'Ok', handler: data => {
         if(data === '1'){
           translate.setDefaultLang('en');
         }
         else{
            translate.setDefaultLang('es');
         }
        }
    });
    language.present();
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD7Ixj_r3ycGy61u-bdO7y6Y-TFOuCfhRo",
      authDomain: "findbooks-1d305.firebaseapp.com",
      databaseURL: "https://findbooks-1d305.firebaseio.com",
      storageBucket: "findbooks-1d305.appspot.com",
      messagingSenderId: "518410877830"
    };
    firebase.initializeApp(config);

    let loader = this.loadingCtrl.create();
    loader.present();
    this.listenToUserStatusUpdate(loader);
    let fireBaseUser = firebase.auth().currentUser;
    console.log(fireBaseUser);
    this.rootPage = fireBaseUser ? TabsPage : LoginPage;
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      platform.pause.subscribe(() => {
        console.log('[INFO] App paused');
      });

      platform.resume.subscribe(() => {
       console.log('[INFO] App resumed');
      });
    });
  }

  listenToUserStatusUpdate(loader: any) {
    firebase.auth().onAuthStateChanged((user) => {
      if(loader){
        loader.dismiss();
        console.log("The User:", user);
      }
      if (user) {
        this.rootPage = TabsPage;
    } else{
      this.rootPage = LoginPage;
    }
    });
  }
    
}
