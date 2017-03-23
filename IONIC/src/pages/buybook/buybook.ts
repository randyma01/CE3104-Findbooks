import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EmailComposer } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'page-buybook',
  templateUrl: 'buybook.html'
})
export class BuybookPage {

  ioncard;
  gender;
  price;
  public dataBook: any[] = [];
  public genderBooks: any[] = [];
  public author;
  public urlPhoto;
  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public translate: TranslateService) {  
    var keyValue;
    var ref = firebase.database().ref("Books");
    var that = this;
    ref.orderByChild("Gender").on("child_added", function(snapshot) {
      keyValue = snapshot.key;
      return firebase.database().ref('Books/' + keyValue).once('value').then(function(snapshot) {
        var Gender = snapshot.val().Gender;
        var genderB = that.genderBooks[that.genderBooks.length - 1];
        if(Gender != genderB){
          that.genderBooks.push(Gender);
        }else{
          console.log("Son iguales");
        }
      });
    });
  }

  onchange(){
    this.dataBook = [];
    let loader = this.loadingCtrl.create({
      duration: 2000
    });
    var content;
    this.translate.get('BUY_PAGE.LOADER').subscribe(
      value => {
        content = value;
      });
    loader.setContent(content);
    var keyValue;
    var ref = firebase.database().ref("Books");
    var that = this;
    ref.orderByChild("Gender").equalTo(this.gender).on("child_added", function(snapshot) {
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
        
        that.addBook(Title, Author, Price, Language, Photo, Email, PhoneNumberUser);
      });
    });
    loader.present();
    
  }

  addBook(titleB, authorB, priceB, languageB, urlPhoto, emailB, number){
    const data = {
      title: titleB,
      author: authorB,
      price: priceB,
      language: languageB,
      photo: urlPhoto,
      email: emailB,
      Pnumber: number
    }
    this.dataBook.push(data);
  }

  sendMessage(emailSend, number){
    var user = firebase.auth().currentUser;
    EmailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
    });
    var subjectSend;
    this.translate.get('BUY_PAGE.EMAILSUBJET').subscribe(
      value => {
        subjectSend = value;
    });
    var bodySend;
    this.translate.get('BUY_PAGE.EMAILBODY').subscribe(
      value => {
        bodySend = value;
    });
    let email = {
      to: emailSend,
      subject: subjectSend,
      body: bodySend + user.email,
      isHtml: true
    };
    // Send a text message using default options
    EmailComposer.open(email);

    var titleAlert;
    this.translate.get('BUY_PAGE.ALERTTITLE').subscribe(
      value => {
        titleAlert = value;
    });
    var subTitleAlert;
    this.translate.get('BUY_PAGE.ALERTSUBTITLE').subscribe(
      value => {
        subTitleAlert = value;
    });
    let alert = this.alertCtrl.create({
      title: titleAlert,
      subTitle: subTitleAlert + number,
      buttons: ['OK']
    });

    //aler rankign
    var alertRangin;
    this.translate.get('BUY_PAGE.ALERTRATINGTITLE').subscribe(
      value => {
        alertRangin = value;
    });
    let rankign = this.alertCtrl.create();
    rankign.setTitle(alertRangin);

    rankign.addInput({
      type: 'radio',
      label: '★',
      value: '1',
      checked: true
    });
    rankign.addInput({
      type: 'radio',
      label: '★★',
      value: '2'
    });
    rankign.addInput({
      type: 'radio',
      label: '★★★',
      value: '3',
    });
    rankign.addInput({
      type: 'radio',
      label: '★★★★',
      value: '4'
    });
    rankign.addInput({
      type: 'radio',
      label: '★★★★★',
      value: '5'
    });

    rankign.addButton('Cancel');
    rankign.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        alert.present();
      }
    });
    rankign.present().then(() => {
      this.testCheckboxOpen = true;
      console.log(this.testCheckboxResult);
    });
  }

}
