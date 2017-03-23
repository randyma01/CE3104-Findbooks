import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ContactPage } from '../contact/contact';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  input = {
    Email: '',
    Password: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToOk(){
    firebase.auth().createUserWithEmailAndPassword(this.input.Email, this.input.Password).catch(function(error) {
     var errorMessage = error.message;
     console.log(errorMessage);
    });
    this.navCtrl.setRoot(ContactPage);
  }

}
