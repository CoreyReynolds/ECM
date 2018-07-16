import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = { rowid:0, officerID: 0, violationID: 0, issueDate: "", blockNum: 0, issueStreetNum: 0, issueStreetName: "", issueStreetType: "", custStreetNum: "", custStreetName: "", custStreetType: "", custCity: "", custProvince: "", custPostalCode: "", pubComment: "", privateComment: "", locationComment: "", warning: 0, custFirstName: "", custLastName: "", groupName: "", custType: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM inspection WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.officerID = res.rows.item(0).officerID; 
            this.data.violationID = res.rows.item(0).violationID;
            this.data.issueDate = res.rows.item(0).issueDate; 
            this.data.blockNum = res.rows.item(0).blockNum; 
            this.data.issueStreetNum = res.rows.item(0).issueStreetNum; 
            this.data.issueStreetName = res.rows.item(0).issueStreetName;
            this.data.issueStreetType = res.rows.item(0).issueStreetType; 
            this.data.custStreetNum = res.rows.item(0).custStreetNum; 
            this.data.custStreetName = res.rows.item(0).custStreetName; 
            this.data.custStreetType = res.rows.item(0).custStreetType; 
            this.data.custCity = res.rows.item(0).custCity; 
            this.data.custProvince = res.rows.item(0).custProvince;
            this.data.custPostalCode = res.rows.item(0).custPostalCode; 
            this.data.pubComment = res.rows.item(0).pubComment; 
            this.data.privateComment = res.rows.item(0).privateComment; 
            this.data.locationComment = res.rows.item(0).locationComment; 
            this.data.warning = res.rows.item(0).warning; 
            this.data.custFirstName = res.rows.item(0).custFirstName; 
            this.data.custLastName = res.rows.item(0).custLastName; 
            this.data.groupName = res.rows.item(0).groupName; 
            this.data.custType = res.rows.item(0).custType;
          }
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

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE inspection SET officerID = ?, violationID = ?, issueDate = ?, blockNum = ?, issueStreetNum = ?, issueStreetName = ?, issueStreetType = ?, custStreetNum = ?, custStreetName = ?, custStreetType = ?, custCity = ?, custProvince = ?, custPostalCode = ?, pubComment = ?, privateComment = ?, locationComment = ?, warning = ?, custFirstName = ?, custLastName = ?, groupName = ?, custType = ? WHERE rowid=?',[this.data.officerID, this.data.violationID, this.data.issueDate, this.data.blockNum, this.data.issueStreetNum, this.data.issueStreetName, this.data.issueStreetType, this.data.custStreetNum, this.data.custStreetName, this.data.custStreetType, this.data.custCity, this.data.custProvince, this.data.custPostalCode, this.data.pubComment, this.data.privateComment, this.data.locationComment, this.data.warning, this.data.custFirstName, this.data.custLastName, this.data.groupName, this.data.custType, this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Inspection updated', '5000', 'center').subscribe(
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