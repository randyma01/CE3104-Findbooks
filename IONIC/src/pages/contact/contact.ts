import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
 input = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addrres: '',
    country: '',
    gender: ''
  };
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }
  goToOk(){
    var user = firebase.auth().currentUser;
    var newUser={
      FirstName: this.input.firstName,
      LastName: this.input.lastName,
      PhoneNumber : this.input.phoneNumber,
      Email : user.email,
      Addrres: this.input.addrres,
      Country: this.input.country,
      Gender: this.input.gender,
      Ranking: 0
    }
    var myRef = firebase.database().ref('Users/').push(newUser);
    //add navCtrl push TabsPage
    let loader = this.loadingCtrl.create({
      content: "Creating User...",
      duration: 2000
    });
    loader.present();
    this.navCtrl.setRoot(TabsPage);
  }


}
