import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  
  }

  goToView(){
    this.navCtrl.push(DetallePage);
  }

}
