import { Component } from '@angular/core';
import { NavController,ModalController,Platform } from 'ionic-angular';
import {PrintImageProvider} from '../../providers/print/print_image';
import {PrinterListModalPage} from '../printer-list-modal/printer-list-modal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as html2canvas from 'html2canvas';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter:any=[];

  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
    private printImageProvider: PrintImageProvider,
    private platform:Platform) {
      this.openUrl();
  }

  openUrl() {
    this.platform.ready().then(() => {
      let iab = new InAppBrowser();
      // let url = "http://demo.result.bet";
      // let url = "http://192.168.15.3:3000";
      let url = "http://nacional.bet";
      const browser = iab.create(url, "_blank", "location=no");
      browser.on("loadstop").subscribe((event) => {
        browser.executeScript(
          { code: "window.localStorage.setItem('name', '')"}
        );
        browser.executeScript({ code:
          "$(document).on('click', 'a#print-button', function(){window.localStorage.setItem('action','Print');})"
        });
        this.setName(browser);
      });

    });
  }

  public setName(browser) {
    var $self = this;
    setInterval(function() {
      browser.executeScript({
        code: "localStorage.getItem( 'action' )"
      }).then(values => {
        var action = values[ 0 ];
        if ( action ) {
          if (action=="Print"){
          browser.executeScript(
            { code: "window.localStorage.setItem('action', '')" }
          );
            $self.selectDevice(browser);
          }
        }
      });
    }, 2000);
  }

  private pad(string1, string2, size) {
    var finalString = string1;
    var paddingSize = size - string1.length - string2.length;
    finalString += ' '.repeat(paddingSize) + string2;
    return finalString;
  }

  private selectDevice(browser){
    var $self = this;
    browser.executeScript(
      { code: "window.localStorage.setItem('action', '')" }
    );
    $self.printImageProvider.listBluetoothDevices().then(
      datalist => {
        browser.hide();
        let modal=$self.modalCtrl.create(PrinterListModalPage,{data:datalist});
        modal.present();
        modal.onDidDismiss((data)=>{
          browser.show();
          $self.printImageProvider.connect(data.address).then(
            result => {
              browser.executeScript({ code: "document.getElementsByClassName('print-mobile')[0].innerHTML"})
                .then(response => {
                  var content = response[0]
                  content = content.replace('/\//','//')
                  $self.printImageProvider.printText(content, 'ISO-8859-1');
                });
            },
            error => {
              console.log(JSON.stringify(error));
              alert(error["message"]);
            });
          });
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }


}
