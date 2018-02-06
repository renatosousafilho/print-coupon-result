import { Injectable } from '@angular/core';
declare let DatecsPrinter:any;

@Injectable()
export class PrintImageProvider {

  public listBluetoothDevices(){
    return new Promise((resolve, reject) => {
        DatecsPrinter.listBluetoothDevices(
          function (success) {
            resolve(success);
          },
          function (error) {
            reject(error);
          });
    });
  }

  public connect(address){
       return new Promise((resolve, reject) => {
           DatecsPrinter.connect( address, function (success) {
               resolve(success);
           }, function (error) {
               reject(error);
           });
       });
  }

  public printText(text, charset = 'UTF-8'){
    // ISO-8859-1
    return new Promise((resolve, reject) => {
      DatecsPrinter.printText( text, charset, function (success) {
        resolve(success);
      }, function (error) {
        reject(error);
      });
    });
  }

  public printImage(image, width, height, align){
    console.log(image);
    return new Promise((resolve, reject) => {
      DatecsPrinter.printImage( image, width, height, align, function (success) {
        resolve(success);
      }, function (error) {
        reject(error);
      });
    });
  }

}
