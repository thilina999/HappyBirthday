import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})

export class AddPage {

  data = { name:"", birthday:new Date(), withoutYear:false };
  //private db: SQLiteObject;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    private localNotifications: LocalNotifications,
    public platform: Platform) { 
    }

    saveData() {
      if(!(this.data.name == "" || this.data.birthday==null )){
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
let birthday_month=birthday_date.getMonth()+1;

  this.localNotifications.schedule({
    title:"Birthdays",
    text: "Hey, it's "+this.data.name+"'s birthday.",
    every: { month: birthday_month, day: birthday_day, hour: 21, minute: 45 }, 
    led: 'FF720B',
    vibrate: true,
    sound: this.platform.is('android') ? 'file://assets/sounds/definite.mp3': 'file://assets/sounds/definite.caf',
    icon: 'file://assets/imgs/cake.png'
  });
}
}
