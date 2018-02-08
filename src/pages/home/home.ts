import { Component } from '@angular/core';
import { NavController,ModalController,AlertController,Platform } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,private modalCtrl:ModalController,
    private printImageProvider: PrintImageProvider,
    private alertCtrl:AlertController, private platform:Platform) {
      this.openUrl();
  }

  openUrl() {
    this.platform.ready().then(() => {
      let iab = new InAppBrowser();
      let url = "http://demo.lazarus.bet"
      const browser = iab.create(url, "_blank", "location=no");
      browser.on("loadstop").subscribe((event) => {
        browser.executeScript(
          { code: "window.localStorage.setItem('name', '')"}
        );
        browser.executeScript({ code:
          "$(document).on('click', 'a#print-button', function(){window.localStorage.setItem('action','Print');})"
        });
        browser.executeScript({ code:
          "$('#sidebar-right-button').on('click', function(){window.localStorage.setItem('action','Test')})"
        });
        this.setName(browser);

      });

    });
  }


  printImage(imageBase, canvas) {
    this.printImageProvider.listBluetoothDevices().then(result => {
      this.printImageProvider.connect(result[1].address).then(result => {
        this.printImageProvider.printImage(imageBase, canvas.width, canvas.height, 0);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  public printCoupon(iframedoc)
  {
      let $self = this;
      setTimeout(function(){
          var imagedata;
          html2canvas(iframedoc.body)
          .then(function(canvas) {
            imagedata = canvas.toDataURL('image/png');
            var myImage = new Image();
            myImage.src = imagedata;
            myImage.onload = function () {
              var canvas = document.createElement("canvas");
              canvas.height = 210;
              canvas.width = 382;
              var context = canvas.getContext('2d');
              context.drawImage(myImage, 0, 0);
              var imageBase =
              canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
              $self.printImage(imageBase, canvas);
            };
          })
          .catch((error) => {alert('erro no html2canvas: ' + error)});
      }, 10);
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
            browser.executeScript({ code: "document.getElementsByClassName('printable')[0].innerHTML"})
            .then(response => {
              // alert("Printing...");
              // alert(response);
              let iframe=document.createElement('iframe');
              document.body.appendChild(iframe);
              var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
              var div=document.createElement('div');
              div.classList.add("col-sm-12");
              div.innerHTML=response;
              iframedoc.body.appendChild(div);

              var link=document.createElement('link');
              link.href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
              link.rel='stylesheet';
              iframedoc.head.appendChild(link);

              var css = 'body { width: 200px; }',
              head = iframedoc.head,
              style = document.createElement('style');

              style.appendChild(document.createTextNode(css));

              head.appendChild(style);
              // $self.printCoupon(iframedoc);
            });
          }
          if (action=="Test") {
            browser.executeScript(
              { code: "window.localStorage.setItem('action', '')" }
            );
            $self.printImageProvider.listBluetoothDevices().then(datalist => {
              browser.hide();
              let modal=$self.modalCtrl.create(PrinterListModalPage,{data:datalist});
              modal.present();
              modal.onDidDismiss((data)=>{
                browser.show();
                $self.printImageProvider.connect(data.address).then(result => {
                  $self.printImageProvider.printText("Hello");
                  $self.printImageProvider.printText("Hello");
                  $self.printImageProvider.printText("Hello");
                });
              });
            });
          }
        }
      });
    });
  }



}
