import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DetallePage } from '../detalle/detalle';

import { Camera } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { LoadingController } from 'ionic-angular';

import {TranslateService} from 'ng2-translate';



@Component({
  selector: 'page-sellbook',
  templateUrl: 'sellbook.html'
})
export class SellbookPage {
  input = {
    title: '',
    author: '',
    gender: '',
    language: '',
    year: '',
    price: ''
  };
  latitude; longitude;
  urlPicture;
  pictureUpload;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  goToSubmit(){ 
    var that = this;
    var storageRef = firebase.storage().refFromURL('gs://findbooks-1d305.appspot.com/books/');
    var uploadTask = storageRef.child(that.input.title).putString(that.pictureUpload, 'base64', {contentType: 'image/jpeg'});
    uploadTask.on('state_changed', function(snapshot){
    }, function(error) {
    }, function() {
      var downloadURL = uploadTask.snapshot.downloadURL;
      that.urlPicture = downloadURL;

      var keyValue;
      var pNumberUser;
      var user = firebase.auth().currentUser;
      var ref = firebase.database().ref("Users");
      ref.orderByChild("Email").equalTo(user.email).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        keyValue = snapshot.key;
        return firebase.database().ref('Users/' + keyValue).once('value').then(function(snapshot) {
          var PhoneNumber = snapshot.val().PhoneNumber;
          pNumberUser = PhoneNumber;
          var newBook={
            Title: that.input.title,
            Author: that.input.author,
            Gender : that.input.gender,
            Language : that.input.language,
            Year: that.input.year,
            Price: that.input.price,
            Photo: that.urlPicture,
            Email: user.email,
            PhoneNumberUser: pNumberUser   
          }
          console.log(newBook);
          var myRef = firebase.database().ref('Books/').push(newBook);

        });
      });

    });

   
    let loader = this.loadingCtrl.create({
      //content: 'SELL_PAGE.LOADER',
      duration: 2000
    });
    var content = "'SELL_PAGE.YEAR' | translate";
    loader.setContent(content);
    loader.present();
    
    
  }



  onTakePhoto(){
    var that = this;
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 80,
        destinationType: 0,
        cameraDirection: 0,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: 1,
        saveToPhotoAlbum: false,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      that.pictureUpload = imageData;
    }, (err) => {
    // Handle error
    });
  } 




  onWeatherError(error) {
      console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
  }
  goToGetLocation(){
    var that = this;
    var onWeatherSuccess = function (position) {
      that.latitude = position.coords.latitude;
      that.longitude = position.coords.longitude;
    }
    navigator.geolocation.getCurrentPosition
    (onWeatherSuccess, that.onWeatherError, { enableHighAccuracy: true });
  }

}