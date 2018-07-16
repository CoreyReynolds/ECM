import { NgModule } from '@angular/core';
import { CustLogoutComponent } from './cust-logout/cust-logout'
import {IonicModule}  from 'ionic-angular'

@NgModule({
  declarations: [CustLogoutComponent],
  imports: [IonicModule],
  exports: [CustLogoutComponent]
})
export class ComponentsModule { }