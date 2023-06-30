import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBRDTFService } from 'src/app/services/ibrdtf.service';
import { TasasIbrI } from 'src/app/core/models/ibrdtfInterface';
import { errorMessages } from 'src/app/core/Messages/messages';
import { DataComponentService } from 'src/app/services/data-component.service';
import { EncryptService } from 'src/app/services/encrypt.service';


@Component({
  selector: 'app-tasa-ibr-dtf',
  templateUrl: './tasa-ibr-dtf.component.html',
  styleUrls: ['./tasa-ibr-dtf.component.scss']
})
export class TasaIBRDTFComponent  implements OnInit {
  public tasas: TasasIbrI;
  public statusInput: any;
  public tasasCargadas: boolean;
  public tasasActualizar: boolean;
  public showToast: boolean;
  public dateToday:Date;
  public today:string;
  public txtMsg:string;
  public modalLoader:boolean;
  public objectRates: Array<TxtBox>;
  public enableBtnGuardar: boolean;
  public showSkeleton: boolean;
  public showComponent: boolean;
  constructor(private readonly apiIbrDtf: IBRDTFService,
    private readonly dataComponent: DataComponentService,
    private readonly crypto:EncryptService,
    private readonly router: Router) {
   }
  ngOnInit(): void {
    this.showSkeleton = true;
    this.showComponent = false;
    this.objectRates = [];
    var tipoTasas = ["DTF","IBR 1M","IBR 3M","IBR 6M"];
    this.modalLoader=false
    this.tasasCargadas = false;
    this.enableBtnGuardar = false;
    this.txtMsg="El valor no es valido";
    this.tasasActualizar = false;
    this.showToast = false;
    this.dateToday = new Date();
    this.dataComponent.setFalsyUpdateRate();
      tipoTasas.forEach(nameRate => {
        var t = new TxtBox()
            t.name = nameRate;
            this.objectRates.push(t);
        });
      this.today = `${this.dateToday.getDate()}/${(this.dateToday.getMonth()+1)}/${this.dateToday.getFullYear()}`
      this.statusInput = ["ENABLED","DISABLED","ERROR"];
      this.enableInput();
      this.apiIbrDtf.findFecha(this.today).subscribe(m => {
        this.findedTasas(m);
        })
  }
  hideSkeletonShowComponent(){
    this.showSkeleton = false;
    this.showComponent = true;
  }
  findedTasas(m: any){
     const finded = Object.values(m)[0]
          if (finded){
            this.apiIbrDtf.getTasas(this.today).subscribe(mm => {
              const tasasGet = Object.values(mm)[0][0] as TasasIbrI
              this.tasasFinded(tasasGet);
              this.hideSkeletonShowComponent()
            })
          }else{
            this.hideSkeletonShowComponent()
    }
  }
  setTasas(tasas: any){
    this.objectRates[1].text = tasas['IBR 1M'].toString()+" %";
    this.objectRates[1].campoOk= true
    this.objectRates[2].text = tasas['IBR 3M'].toString()+" %";
    this.objectRates[2].campoOk= true
    this.objectRates[3].text = tasas['IBR 6M'].toString()+" %";
    this.objectRates[3].campoOk= true
    this.objectRates[0].text = tasas.DTF.toString()+" %";
    this.objectRates[0].campoOk= true
  }
  tasasFinded(obTasas: TasasIbrI){
    this.tasas = obTasas
    this.setTasas(this.tasas);
    this.tasasCargadas = true;
    this.showToast = true;
    this.enableBtnGuardar = true;
    setTimeout(() => {
      this.tasasCargadas=false;
      this.showToast = false;
     }, 15000);
  }

  enableInput(){
    this.objectRates.forEach(boxTasa => {
      boxTasa.status=this.statusInput[0];
    });
  }
  disableInput(){
    this.objectRates.forEach(boxTasa => {
      boxTasa.status=this.statusInput[1];
    });
  }

  BtnAceptar(){
    this.tasas = {
      'IBR 1M': parseFloat(this.quitarCaracteres(this.objectRates[1].text+"")),
      'IBR 3M': parseFloat(this.quitarCaracteres(this.objectRates[2].text.toString())),
      'IBR 6M': parseFloat(this.quitarCaracteres(this.objectRates[3].text.toString())),
      DTF:   parseFloat(this.quitarCaracteres(this.objectRates[0].text.toString())),
      date:  this.today
    }
    const resp = this.apiIbrDtf.postTasas(this.tasas);
    resp.subscribe(m => {
      if (Object.values(m)[0]==="Tasa creada Correctamente") {
        localStorage.setItem(this.crypto.encrypt("tasas_cargadas"),this.crypto.encrypt("true"));
        this.dataComponent.setTruthyUpdateRate();
        this.regresar();
      }
    })
  }

  regresar(){
    this.router.navigate([""]);
  }

  validarCampoOK(txt: string){
    const num = parseFloat(this.quitarCaracteres(txt));
    if (txt===""){
      return errorMessages.emptyField
    }else if (num<=0 || num>30){
      return errorMessages.rangeRates
    }else if (txt.split(".").length>2||txt[0]==="."){
      return errorMessages.otro
    }
    return "-1"
  }
  closeBanner(){
    this.showToast = false;
  }
  validarPorcentaje(event: Event){
    var obText = event.target as HTMLInputElement;// <HTMLInputElement>event.target;
    var valText = this.quitarCaracteres(obText.value);
    obText.value=valText.toString();
  }
  blurEvent(event: any, i:number){
    var obText = event.target as HTMLInputElement;
    var valText = this.quitarCaracteres(obText.value);
    obText.value = valText.toString()===""?"":valText.toString() +" %";
    const txtError=this.validarCampoOK(valText);
    if (txtError==="-1"){
      this.objectRates[i].status=this.statusInput[0];
      this.objectRates[i].campoOk=true;
    }else{
      this.objectRates[i].status=this.statusInput[2];
      this.objectRates[i].txtMsg=txtError;
      this.objectRates[i].campoOk=false;
    }
    for (let j = 0; j < this.objectRates.length; j++) {
      if(!this.objectRates[j].campoOk){
        this.enableBtnGuardar=false
        break;
      }
      if (j===this.objectRates.length-1) {
        this.enableBtnGuardar=true
      }
    }
  }

  quitarCaracteres(numC: string) : string{
    var pattern = /[^0-9\.]/gi;
    return numC.replace(pattern,'');
  }

  btnEditar(){
    this.enableInput();
    this.tasasCargadas = false;
    this.tasasActualizar = true;
  }
}

class TxtBox {
  public name: string
  public status: string
  public text: string
  public txtMsg: string
  public campoOk: boolean
  constructor() {
    this.status="ENABLED"
    this.txtMsg=""
    this.text=""
    this.campoOk=false
  }
}


