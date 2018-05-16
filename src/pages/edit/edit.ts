import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit.html',
})
export class EditPage {

  data = { rowid:0, name:"", birthday:"",withoutYear:false };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'happybirthday.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM birthdays WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.name = res.rows.item(0).name;
            this.data.birthday = res.rows.item(0).birthday;
            this.data.withoutYear = res.rows.item(0).withoutYear;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    if(!(this.data.name == "" || this.data.birthday == "" )){
    this.sqlite.create({
      name: 'happybirthday.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE birthdays SET name=?,birthday=?,withoutYear=?  WHERE rowid=?',[this.data.name,this.data.birthday,this.data.withoutYear,this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Riminder updated', '5000', 'bottom').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'bottom').subscribe(
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
  }else{
    this.toast.show("Invalid Inputs", '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
}