import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'; 
import { Observable } from '../../../node_modules/rxjs/Observable';




@Injectable()
export class SelectionDataProvider {

  item: any;
  content: any;

  public db: SQLiteObject;

  public userCitationTypeSelection: any;

  public constructor( private sqlite: SQLite, private httpClient: HttpClient) {    
  }

  public ConfirmLoginOptions(crName: string): Observable<string[]>{
    if (crName === null) {
      return Observable.throw("Credential not provided");
    } else {
      return Observable.create(observer => {
        // At this point make a request to backend to make a real check
        this.db.executeSql('SELECT * FROM userenfoptions;', {})
        .then((resUsersLoaded) => {
          let citationTypes: string[]=[];
          for (let i = 0; i < resUsersLoaded.rows.length; i++) {          
            if (resUsersLoaded.rows.item(i).USERID === crName )
                {citationTypes.push(resUsersLoaded.rows.item(i).TYPE)}                 
          }
          observer.next(citationTypes);
          observer.complete();
         }).catch(e => console.log(e));
      });
    }
  }

  public ConfirmLogin(crName: string, crPass: string): Observable<any>{
    if (crName === null || crPass === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to backend to make a real check
        this.db.executeSql('SELECT * FROM users;', {})
        .then((resUsersLoaded) => {
          let access: boolean = false;
          for (let i = 0; i < resUsersLoaded.rows.length; i++) {
            if (resUsersLoaded.rows.item(i).USERID === crName && resUsersLoaded.rows.item(i).PASSWORD === crPass)
                {console.log(resUsersLoaded.rows.item(i) + " login match FOUND"); access = true; break;}                 
          }
          observer.next(access);
          observer.complete();
         }).catch(e => console.log(e));
      });
    }
  }

  initStorage(): Promise<any>
  {
    return this.sqlite.create({name: 'data.db', location: 'default' }).then (db => {
      this.db = db;
      return Promise.all([
        this.GenerateTempLocalData('users', 'rowid INTEGER PRIMARY KEY, USERID TEXT, PASSWORD TEXT', 'GenerateInitialUsers'),
        this.GenerateTempLocalData('userenfoptions', 'rowid INTEGER PRIMARY KEY, USERID TEXT, TYPE TEXT', 'GenerateInitialUserEnforcementOptions'),
        this.GenerateTempLocalData('violations', 'rowid INTEGER PRIMARY KEY, VIC_UID INT, VIC_LEGAL_DESCRIPTION TEXT, VIC_LONG_DESCRIPTION TEXT, VIC_BASE_AMOUNT INT, VIC_CODE TEXT, CON_VIOLATION_CODE_MLKP TEXT', 'GenerateInitialViolations'),
        this.GenerateTempLocalData('comments', 'rowid INTEGER PRIMARY KEY, HAN_DESCRIPTION TEXT, HAN_CODE TEXT, HAN_UID TEXT, HCT_BITFIELD_COMMENT_TYPE TEXT', 'GenerateInitialComment'),
        this.GenerateTempLocalData('locations', 'rowid INTEGER PRIMARY KEY, CLM_DESCRIPTION TEXT, CLM_CODE TEXT, CLM_UID TEXT', 'GenerateInitialLocations'),
  
      ]).then(data=> {  
        console.log('**local data tables created and populated check', data);
      })
    })
  }

  GenerateTempLocalData(tableName: string, tableCreationText: string, sourceLocation: string): Promise<any>
  {
    //let d = new Date();
    return this.db.executeSql('DROP TABLE IF EXISTS '+ tableName +';', {}).then(dres => {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS '+ tableName +'('+ tableCreationText +');', {})
    .then((res) => {
      //console.log('Generated '+ tableName +' table', res);
    })
    .catch(e => console.log(e + ' ERROR in creating ' + tableName + ' table'));
    this.httpClient.get('../../assets/hardcode/' + sourceLocation+ '.txt', {responseType: 'text'}).
    subscribe(data => {
      /*console.log("table setup for " + tableName + " m:" + d.getMinutes() + " s:" + d.getSeconds() + " ml:" + d.getMilliseconds() + " and confirming drop query: [" +
      'DROP TABLE IF EXISTS '+ tableName +';' + "] and createTable string: [" + 'CREATE TABLE IF NOT EXISTS '+ tableName +'('+ tableCreationText +');' + "] and the doc location: [" +
      '../../assets/hardcode/' + sourceLocation+ '.txt' + "] and finally the actual generation string: [" + data + "]"); */
      return this.db.executeSql(data, {}).catch(e => console.log(e));
    });
  }).catch(e => console.log(e));
  }

}