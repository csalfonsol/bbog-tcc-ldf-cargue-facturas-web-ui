import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private readonly key: string;
  constructor(){
    this.key="LDF$3&6ROhqS4Nylna@";
  }
  encrypt(value: string | CryptoJS.lib.WordArray | any){
    return  CryptoJS.AES.encrypt(value,this.key).toString();
  }
  deencrypt(value: string){
    return CryptoJS.AES.decrypt(value,this.key).toString(CryptoJS.enc.Utf8);
  }
}
