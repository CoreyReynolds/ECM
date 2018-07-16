import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-inspections',
  templateUrl: 'inspections.html',
})
export class InspectionsPage {

  	public items = [];
	inspections: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InspectionsPage');
		this.getData();
	}
	
	ionViewWillEnter() {
	  this.getData();
	}
	
	ionViewDidEnter(){
	/**	this.items = [{"name": "name1", "date": "01/01/18"},{"name": "name2", "date": "01/01/18"},{"name": "name3", "date": "01/01/18"}]; */


	}

	public createInspection() {
	/**	this.items.push ({"name": "addedName", "date": "01/01/18"}); */
	}


	getData() {
	  this.sqlite.create(
	  {
	    name: 'ionicdb.db',
	    location: 'default'
	  }).then((db: SQLiteObject) => {
	    db.executeSql('CREATE TABLE IF NOT EXISTS inspection(rowid INTEGER PRIMARY KEY, officerID INT, violationID INT, issueDate TEXT, blockNum INT, issueStreetNum INT, issueStreetName TEXT, issueStreetType TEXT, custStreetNum TEXT, custStreetName TEXT, custStreetType TEXT, custCity TEXT, custProvince TEXT, custPostalCode TEXT, pubComment TEXT, privateComment TEXT, locationComment TEXT, warning INT, custFirstName TEXT, custLastName TEXT, groupName TEXT, custType TEXT)', {})
	    .then(res => console.log('Executed SQL'))
	    .catch(e => console.log(e));

	    db.executeSql('SELECT * FROM inspection ORDER BY rowid DESC', {})
	    .catch(e => console.log(e));
	  }).catch(e => console.log(e));


	}


	addData() {
	  this.navCtrl.push('AddDataPage');
	}


	editData(rowid) {
	  this.navCtrl.push('EditDataPage', {
	    rowid:rowid
	  });
	}


	deleteData(rowid) {
	  this.sqlite.create({
	    name: 'ionicdb.db',
	    location: 'default'
	  }).then((db: SQLiteObject) => {
	    db.executeSql('DELETE FROM inspection WHERE rowid=?', [rowid])
	    .then(res => {
	      console.log(res);
	      this.getData();
	    })
	    .catch(e => console.log(e));
	  }).catch(e => console.log(e));
	}

}
