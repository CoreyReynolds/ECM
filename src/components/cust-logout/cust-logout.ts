import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';
import { NavController, Loading, IonicPage } from 'ionic-angular';



@Component({
  selector: 'cust-logout',
  templateUrl: 'cust-logout.html'
})
export class CustLogoutComponent {

  text: string;

  constructor(private nav: NavController, private auth: AuthService) {}

    public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }


}
