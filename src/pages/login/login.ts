import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, MenuController } from 'ionic-angular';
import { SelectionDataProvider } from '../../providers/selection-data/selection-data';


 /**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum LoginStatus { BLANK, AUTHENTICATED, LOGIN}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginStatus: LoginStatus = LoginStatus.BLANK;
  public citationTypes: string[]=[];
  citationType: string = "WPA";
  ngCitationType: boolean = false;
  progressButtonText: string = "Authenticate";
  registerCredentials = { logID: 'creynold', password: 'pass' };


  //_db: SQLiteObject = null
  passwordDB: any;
  loading: Loading;
  
  constructor(
    public nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menu: MenuController,
    private selectionData: SelectionDataProvider
  ) {}

  public SetLogin(status: LoginStatus) {

    if (status===LoginStatus.AUTHENTICATED){
      this.citationTypes = [];


      this.selectionData.ConfirmLoginOptions(this.registerCredentials.logID).subscribe(cTypesAllowed => {
        if (cTypesAllowed.length <=0)
        {
          this.showError ("No enforcement options available for user. Please see your System Administrator to ensure you have access.", false);
        } else{
          this.citationTypes = cTypesAllowed;
          this.loginStatus = LoginStatus.AUTHENTICATED;
          this.ngCitationType = true;
          this.progressButtonText = "Continue";
        }
        },
        error => {
          this.showError(error, false);
        });
        
    }else{
      this.ngCitationType = false;
      this.citationTypes = [];
      this.progressButtonText = "Authenticate";
      this.loginStatus = LoginStatus.BLANK;
    }
  }

  ionViewWillEnter()
  {
    this.SetLogin(LoginStatus.BLANK);
  }

  ionViewDidEnter()
  {

    this.menu.swipeEnable(false);
    this.progressButtonText = "Authenticate";
    
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  public login() {
  
    this.showLoading(true)
    this.selectionData.ConfirmLogin(this.registerCredentials.logID, this. registerCredentials.password).subscribe(allowed => {
      
      if (allowed) {        
        if (this.loginStatus===LoginStatus.AUTHENTICATED)
        {                
          this.nav.setRoot('HomePage');
        }else{
          this.closeLoading();
          this.SetLogin(LoginStatus.AUTHENTICATED); 
        }
      } else {
        this.showError ("Incorrect Login/Password", true);
      }},
      error => {
        this.showError(error, true);
      });
        
      
  }
/*
  private ConfirmAuthenticationAvailable():  Observable <resolve>
  {
    let confirmUserObs = new Observable();

      confirmUserObs.subscribe((confirmedAvailable) =>{
        console.log(confirmedAvailable);
      })

        //let access = (credentials.password === "pass" && credentials.confirmation_password === "pass" && 
        //              credentials.name === "corey" && credentials.email === "creynolds@winnipeg.ca");

        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {

          db.executeSql('SELECT * FROM users;', {})
            .then((resUsersLoaded) => {
              this.userSelection = resUsersLoaded;
              for (let i = 0; i < resUsersLoaded.rows.length; i++) {
                let item = resUsersLoaded.rows.item(i);
                return item;
              }
          }).catch(e => console.log(e));

        }
        ).catch(e => console.log(e));
      
  }
*/


closeLoading() {
  this.loading.dismissAll();
}


  showLoading(onPageChange: boolean) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: onPageChange
    });
    this.loading.present();
  }

  showError(text, currentLoadingScreen: boolean) {
    if (currentLoadingScreen) this.loading.dismissAll();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    
    alert.present();
  }


}