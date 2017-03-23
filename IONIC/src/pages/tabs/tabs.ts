import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BuybookPage } from '../buybook/buybook';
import { ContactPage } from '../contact/contact';
import { SellbookPage } from '../sellbook/sellbook';
import { AccountPage } from '../account/account'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = BuybookPage;
  tab3Root: any = SellbookPage;
  tab4Root: any = AccountPage;

  constructor() {

  }
}
