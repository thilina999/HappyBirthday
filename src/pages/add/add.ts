import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  data = { name:"", birthday:"", withoutYear:false };
  //private db: SQLiteObject;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    private localNotifications: LocalNotifications) { 
    }

    saveData() {
      if(!(this.data.name == "" || this.data.birthday == "" )){
        this.sqlite.create({
          name: 'happybirthday.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO birthdays VALUES(NULL,?,?,?)',[this.data.name,this.data.birthday,this.data.withoutYear])
            .then(res => {
              this.sheduleNotification();
              this.toast.show('Saved', '5000', 'bottom').subscribe(
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
          this.toast.show(e, '5000', 'bottom').subscribe(
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
   
sheduleNotification(){
// Schedule delayed notification
let birthdayString =this.data.birthday;
let birthday_date=new Date(birthdayString);
let birthday_day=birthday_date.getDate();
let birthday_month=birthday_date.getMonth();
/*
this.localNotifications.schedule({
  title: this.data.name+" 's Birthday",
  text: "Hey, "+this.data.name+" 's birthday is tommorrow.",
  every: { month: birthday_month, day: birthday_day-1, hour: 12, minute:  },  
  led: 'FF720B'
});*/

this.localNotifications.schedule({
  title: this.data.name+" 's Birthday",
  text: "Hey, it's "+this.data.name+" 's birthday.",
  every: { month: birthday_month, day: birthday_day, hour: 0, minute: 0 },  
  led: 'FF720B'
});
}
  
}
