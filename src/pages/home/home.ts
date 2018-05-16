import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { AddPage } from '../add/add';
import { EditPage } from '../edit/edit';
import { MorePage } from '../more/more';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  birthdays: any = [];

  constructor( public navCtrl: NavController,private sqlite: SQLite,private toast: Toast) { 
  }
  
  ionViewDidLoad() {
    this.getData();
    
  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'happybirthday.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS birthdays(rowid INTEGER PRIMARY KEY, name TEXT, birthday DATE, withoutYear boolean)', {})
      .then(res =>{
        console.log('Executed SQL');
      }
         
      )
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM birthdays ORDER BY rowid DESC', {})
      .then(res => {
        this.birthdays = [];

        for(var i=0; i<res.rows.length; i++) {

        let birthdayString =res.rows.item(i).birthday;
        let birthday_date=new Date(birthdayString);
        let birthday_getTime=birthday_date.getTime();
        let birthday_month=birthday_date.getMonth();
        let birthday_day=birthday_date.getDate();
        let birthday_year=birthday_date.getFullYear();

        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let birthday=birthday_day+" "+months[birthday_month]+", "+birthday_year;
        let birthday_withoutYear=+birthday_day+" "+months[birthday_month];
        
        let d = new Date();

        let turns=Math.floor((d.getTime()-birthday_getTime)*3.1689E-11)+1;
        
        let next_birthday_numb=(birthday_date.setFullYear(birthday_date.getFullYear()+turns));
        let next_birthday_date = new Date(next_birthday_numb);
        let left=Math.round((next_birthday_date.getTime()-d.getTime())*1.1574e-8);

          this.birthdays.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,birthday:birthday,withoutYear:res.rows.item(i).withoutYear,turns:turns,left:left,birthdayWitoutYear:birthday_withoutYear})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  addNew(){
    this.navCtrl.push(AddPage);
  }

  more(){
    this.navCtrl.push(MorePage);
  }

  editData(rowid) {
    this.navCtrl.push(EditPage, {
      rowid:rowid
    });
  }
  
  deleteData(rowid) {
    this.sqlite.create({
      name: 'happybirthday.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM birthdays WHERE rowid=?', [rowid])
      .then(res => {
        this.getData();
        console.log(res);
        this.toast.show("Deleted", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
      .catch(e => {console.log(e);
      alert(e);
      });
    }).catch(e => console.log(e));
  }


}
