import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionsPage } from '../inspections/inspections';
import { ComponentsModule } from "../../components/components.module";



@NgModule({
  declarations: [
    InspectionsPage
  ],
  imports: [
  	ComponentsModule,
    IonicPageModule.forChild(InspectionsPage),
  ],
})
export class InspectionsPageModule {}
