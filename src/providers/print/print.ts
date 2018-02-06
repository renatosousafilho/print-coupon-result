import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Injectable()
export class PrintProvider {

  constructor(private btSerial:BluetoothSerial,private alertCtrl:AlertController) {

  }

  searchBt()
  {
    return this.btSerial.list();
  }

  connectBT(address)
  {
    return this.btSerial.connect(address);

  }

  testPrint(address)
  {
    let printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"


    let xyz=this.connectBT(address).subscribe(data=>{
    });
      // this.btSerial.write(printData).then(dataz=>{
        // console.log("WRITE SUCCESS",dataz);

      //   let mno=this.alertCtrl.create({
      //     title:"Print SUCCESS!",
      //     buttons:['Dismiss']
      //   });
      //   mno.present();
      //
      //   xyz.unsubscribe();
      // },errx=>{
      //   console.log("WRITE FAILED",errx);
      //   let mno=this.alertCtrl.create({
      //     title:"ERROR "+errx,
      //     buttons:['Dismiss']
      //   });
      //   mno.present();
      // });
      // },err=>{
      //   console.log("CONNECTION ERROR",err);
      //   let mno=this.alertCtrl.create({
      //     title:"ERROR "+err,
      //     buttons:['Dismiss']
      //   });
      //   mno.present();
      // });

  }


  // function printImage() {
  //   var imagedata;
  //   let html_string = "<html><head></head><body><p>HI</p></body></html>";
  //   let iframe=document.createElement('iframe');
  //   document.body.appendChild(iframe);
  //   setTimeout(function(){
  //     var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
  //     iframedoc.body.innerHTML=html_string;
  //
  //     html2canvas(iframedoc.body)
  //     .then(function(canvas) {
  //       imagedata = canvas.toDataURL('image/png');
  //       var myImage = new Image();
  //       myImage.src = imagedata;
  //       myImage.onload = function () {
  //         var canvas = document.createElement("canvas");
  //         canvas.height = 890;
  //         canvas.width = 380;
  //         var context = canvas.getContext('2d');
  //         context.drawImage(myImage, 0, 0);
  //         var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  //         window.DatecsPrinter.printImage(
  //           imageData, //base64
  //           canvas.width,
  //           canvas.height,
  //           1,
  //           function() {
  //             // printMyBarcode();
  //           },
  //           function(error) {
  //             alert(JSON.stringify(error));
  //           }
  //         )
  //       };
  //
  // }

}
