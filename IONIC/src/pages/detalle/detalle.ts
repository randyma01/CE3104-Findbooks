import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  public dataBook: any[] = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.dataBook = [];
    let loader = this.loadingCtrl.create({
      content: "Loading Books...",
      duration: 2000
    });
    var keyValue;
    var ref = firebase.database().ref("Books");
    var user = firebase.auth().currentUser;
    var that = this;
    ref.orderByChild("Email").equalTo(user.email).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      keyValue = snapshot.key;
      return firebase.database().ref('Books/' + keyValue).once('value').then(function(snapshot) {
        var Author = snapshot.val().Author;
        var Gender = snapshot.val().Gender;
        var Language = snapshot.val().Language;
        var Price = snapshot.val().Price;
        var Title = snapshot.val().Title;
        var Photo = snapshot.val().Photo;
        var Email = snapshot.val().Email;
        var PhoneNumberUser = snapshot.val().PhoneNumberUser;

        const data = {
          title: Title,
          author: Author,
          price: Price,
          language: Language,
          photo: Photo,
        }
        that.dataBook.push(data);
      });
    });
    loader.present();    
  }

  vendido(title){
    let loaderRemove = this.loadingCtrl.create({
      content: "Remove succeeded!!",
      duration: 2000
    });
    var keyValue;
    var ref = firebase.database().ref("Books");
    var user = firebase.auth().currentUser;
    var that = this;
    ref.orderByChild("Title").equalTo(title).on("child_added", function(snapshot) {
      keyValue = snapshot.key;
      firebase.database().ref('Books/' + keyValue).remove().then(function() {
        console.log("Remove succeeded.");
        loaderRemove.present();
      }).catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
    });
  }

}