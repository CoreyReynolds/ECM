import { Component } from '@angular/core';
import { MenuController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SelectionDataProvider } from '../../providers/selection-data/selection-data';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //username = '';
  //email = '';

  constructor(public menuCtrl: MenuController, public selectionData: SelectionDataProvider) {
    //let info = this.auth.getUserInfo();
    //this.username = info['name'];
    //this.email = info['email'];
  }


  ionViewDidLoad() {
    /* Load temporary data 
    
        selectionData.set("First singleton data");

        */

    //this.selectionData.pullLookupData("MBEA");

  }

}

