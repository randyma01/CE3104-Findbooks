import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  Firstname; Lastname; email; photoUrl; Phonenumber;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var user = firebase.auth().currentUser;
    var keyValue;
    var ref = firebase.database().ref("Users");
    var that = this;
    ref.orderByChild("Email").equalTo(user.email).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      keyValue = snapshot.key;
      return firebase.database().ref('Users/' + keyValue).once('value').then(function(snapshot) {
        var FirstName = snapshot.val().FirstName;
        var PhoneNumber = snapshot.val().PhoneNumber;
        var LastName = snapshot.val().LastName;
        var Price = snapshot.val().Price;
        var Title = snapshot.val().Title;
        var Photo = snapshot.val().Photo;
        
        that.Firstname = FirstName;
        that.Lastname = LastName;
        that.email = user.email;
        that.Phonenumber = PhoneNumber;
        that.photoUrl = user.photoURL;
      });
    });
  }

  goToLogout(){
    firebase.auth().signOut().then(function() {
    }, function(error) {
    });
    this.navCtrl.setRoot(LoginPage);
  }

}
