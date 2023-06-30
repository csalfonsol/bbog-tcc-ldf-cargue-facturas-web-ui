import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AgreementsGridModel } from 'src/app/core/models/table-agreements';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { DataComponentService } from 'src/app/services/data-component.service';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent {

  @ViewChild('dynamicTable', { static: false }) dynamicTable!: ElementRef;
  @ViewChild("loader", { static: false }) loader:ElementRef

  public environmentDownload : string;
  public localRequestValidation: Array<any> = [];
  public dateToday:Date;
  public modalLoader: boolean;
  public txtLoader: string;
  public typeLoader: string;
  agreementsGrid: AgreementsGridModel[] = [];

  constructor(public readonly requestService: RequestService,
    public readonly dataComponent: DataComponentService, private readonly router: Router, private readonly crypto:EncryptService){
      if (!dataComponent.getRatesToday()) {
        this.router.navigate([""]);
      }
      this.environmentDownload = "/"+ environment.pathDonwload;
    }
  ngOnInit(): void {
    this.modalLoader=false;
    this.startShortTimeLoader();
    var start = window.performance.now();
    this.dateToday = new Date();
    this.tableAgreements();
    this.txtLoader = "";
    this.typeLoader = "";
    var end = window.performance.now();
    console.log(`Agreements time: ${end - start} ms`);
  }
  startShortTimeLoader(){
    this.modalLoader=true
    this.txtLoader="Espera un momento, estamos creando el archivo único"
    this.typeLoader = "shortTime";
  }
  endByTimeShortTimeLoader(timeSec: number){
    setTimeout(() => {
      this.endLoader();
     }, timeSec);
  }
  endLoader(){
    this.modalLoader=false
  }
  longTimeLoader(timeSec: number){
    this.modalLoader=true
    const txtStepsLongLoader=
    [
      "Espera un momento, por favor",
      "1/5 Estamos creando el archivo único de facturas",
      "2/5 Ahora validaremos la información para mayor seguridad",
      "3/5 Espera un momento más, por favor",
      "4/5 Solo faltan los últimos detalles",
      "5/5 ¡Este es el último paso!"
    ]
    this.typeLoader = "longTime";
    this.stepsLoaderLong(timeSec,txtStepsLongLoader,0)
  }
  stepsLoaderLong(timeSec: number, txtSteps: Array<string>, index:number){
    if (index<txtSteps.length) {
      this.txtLoader=txtSteps[index];
      setTimeout(() => {
        this.stepsLoaderLong(timeSec,txtSteps,index+1);
      }, timeSec/6);
    }else{
      this.modalLoader=false
    }
  }
  async tableAgreements() {
    const responseArray: Array<any> = await this.getDataFromLocalStorage();
    try {
      if (responseArray) {
        const responseFiltered: Array<any> = this.filterAgreements(responseArray);
        this.gridPushToHtml(responseFiltered);
        this.endLoader();
      } else {
        console.log("Error 500: Error interno del servidor, por favor intente nuevamente. Si el error persiste comuniquese con el area encargada.");
        alert("Error 500: Error interno del servidor, por favor intente nuevamente. Si el error persiste comuniquese con el area encargada.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getDataFromLocalStorage() {
    let responseArray: any[] = [];
    this.localRequestValidation = JSON.parse(this.crypto.deencrypt(localStorage.getItem("localLoadedFiles") ?? ""));
    const reqMapped = this.localRequestValidation.map((eRequest: any) => {
      return this.requestService.getAgreements(eRequest);
    });
    responseArray = await Promise.all(reqMapped);
    return responseArray;
  }

  filterAgreements(responseArray: Array<any>) {
    const responseFiltered: any[] = [];
    const nomProv = "Nombre Proveedor";
    const nomDeud = "Nombre Deudor";
    responseArray.flat().forEach((responseObject: AgreementsGridModel) => {
      const filterRes = responseFiltered.find(objectAgreement => {
        return objectAgreement[nomProv] === responseObject[nomProv] && objectAgreement[nomDeud] === responseObject[nomDeud];
      })
      if (!filterRes) {
        responseFiltered.push(responseObject);
      }
    });
    return responseFiltered;
  }
  gridPushToHtml(responseFiltered: Array<any>) {
    responseFiltered.forEach(element => {
      this.agreementsGrid.push({
        "Numero de facturas" : element['Numero de facturas'],
        "Nombre Proveedor": element['Nombre Proveedor'],
        "Nombre Deudor": element['Nombre Deudor'],
        Tasa: element['Tasa'],
        Spread: element['Spread'] +" %",
        "Desembolso Desde": element['Desembolso Desde'],
        "Plazo Descuento": element['Plazo Descuento']
      });
    });
    document.getElementById('dynamicTable')?.setAttribute('row-table', JSON.stringify(this.agreementsGrid));
  }
  public async calculate() {
    this.startShortTimeLoader();
    var start = window.performance.now();
    const reqCalcMapped = this.localRequestValidation.map(async (eRequest) => {
      return this.splitDataLoad(eRequest, this.requestService);
    })
    await Promise.all(reqCalcMapped);
    var end = window.performance.now();
    console.log(`Execution time: ${end - start} ms`);
    this.endLoader();
    this.router.navigate([environment.pathDonwload]);
  }
  async splitDataLoad(fileData : any, loadService : any):Promise<any[]>{
    let splitData: any;
    let responseBack : any;
    for (let index = 0; index < fileData.data.length; index += 50) {
      splitData = {
        'fileName' : fileData.fileName,
        'data': fileData.data.slice(index, index + 50)
      }
      responseBack = await loadService.calculate(splitData);
    }
    return responseBack;
  }
}
