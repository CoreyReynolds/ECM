import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { SelectionDataProvider } from '../../providers/selection-data/selection-data';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  
  data = { officerID: 0, violationID: 0, issueDate: "", blockNum: 0, issueStreetNum: 0, issueStreetName: "", issueStreetType: "", custStreetNum: "", custStreetName: "", custStreetType: "", custCity: "", custProvince: "", custPostalCode: "", pubComment: "", privateComment: "", locationComment: "", warning: 0, custFirstName: "", custLastName: "", groupName: "", custType: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO inspection VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[this.data.officerID, this.data.violationID, this.data.issueDate, this.data.blockNum, this.data.issueStreetNum, this.data.issueStreetName, this.data.issueStreetType, this.data.custStreetNum, this.data.custStreetName, this.data.custStreetType, this.data.custCity, this.data.custProvince, this.data.custPostalCode, this.data.pubComment, this.data.privateComment, this.data.locationComment, this.data.warning, this.data.custFirstName, this.data.custLastName, this.data.groupName, this.data.custType])
        .then(res => {
          console.log(res);
          this.toast.show('Saved Record', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}