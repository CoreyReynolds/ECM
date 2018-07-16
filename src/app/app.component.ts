import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SelectionDataProvider } from '../providers/selection-data/selection-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen, public selectionData: SelectionDataProvider) {
  this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Inspections', component: 'InspectionsPage' },
      { title: 'Options', component: 'OptionsPage' }
    ];    
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.selectionData.initStorage().then(() => {
        this.rootPage = 'LoginPage';
        let d = new Date();
        console.log("All initial data generated m:" + d.getMinutes() + " s:" + d.getSeconds() + " ml:" + d.getMilliseconds() );
        }).catch(e => {
        console.log('error generating initial databases ' + e)
      });
    });
  }

  public openPage(page) {

    /**this.nativePageTransitions.slide(options);
    console.log("got here");
    this.nav.setRoot(LoginPage)*/
    this.nav.setRoot(page.component);

  }


}
