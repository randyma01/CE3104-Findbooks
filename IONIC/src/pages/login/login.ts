import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GooglePlus} from 'ionic-native';
import { Facebook } from 'ionic-native';


import { ContactPage } from '../contact/contact';
import { SigninPage } from '../signin/signin';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  input = {
    email: '',
    password: ''
  };

  zone: NgZone;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public translate: TranslateService) {
  
  }
  
  verifyUser(){
    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.navCtrl.setRoot(LoginPage);
          unsubscribe();
        } else { 
          this.navCtrl.setRoot(TabsPage); 
          unsubscribe();
        } 
      });     
    });
  }

  goToLogin(){
   firebase.auth().signInWithEmailAndPassword(this.input.email, this.input.password).catch(function(error) {
  });
  this.verifyUser();
  }

  isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.userId) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
  }

  goToLoginGoogle(){
    var that = this;
    GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '518410877830-ueoj1a8agt7frq9gmmea8glr1vuq115j.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  }).then(function (user) {
    console.log(user);
    var userCurrent = firebase.auth().currentUser;
    if(!that.isUserEqual(user, userCurrent)){
      let provider = firebase.auth.GoogleAuthProvider.credential(user.idToken);
      firebase.auth().signInWithCredential(provider).then((success) => {
          that.navCtrl.push(ContactPage);
          console.log('success!', JSON.stringify(success, null, 2));
        }, (error) =>{
          console.log('error', JSON.stringify(error, null, 2))
        });
    }else{
      that.navCtrl.setRoot(TabsPage);
    }
  }, function (error) {
    console.log(error);
  });
  }


  goToLoginFacebook(){
    var that = this;
    Facebook.login(["email"])
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
         let provider = firebase.auth.FacebookAuthProvider.credential(user.idToken);
                firebase.auth().signInWithCredential(provider).then((success) => 
                {
                 //that.navCtrl.push(ContactPage);
                  console.log('success!', JSON.stringify(success, null, 2));
                }, (error) =>
                {
                    console.log('error', JSON.stringify(error, null, 2))
                });
    }, function(error){
      console.log(error);
    });
  });
}

  goToSignin(){
    this.navCtrl.setRoot(SigninPage);
  }
 
}
