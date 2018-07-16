import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    OptionsPage
  ],
  imports: [
  	ComponentsModule,
    IonicPageModule.forChild(OptionsPage),
  ],
})
export class OptionsPageModule {}
