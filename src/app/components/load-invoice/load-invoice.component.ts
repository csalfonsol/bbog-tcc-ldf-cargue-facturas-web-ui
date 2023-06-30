import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataComponentService } from 'src/app/services/data-component.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { constants } from 'src/app/core/Messages/messages';
import * as XLSX from 'xlsx';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-load-invoice',
  templateUrl: './load-invoice.component.html',
  styleUrls: ['./load-invoice.component.scss']
})

export class LoadInvoiceComponent implements OnInit {
  @ViewChild('cardChecked') cardChecked!: ElementRef;
  @ViewChild('upload') upload: ElementRef;
  public environmentAgreements : string;
  public fileName: string;
  public loadingFile: boolean;
  public excelData: any;
  public excelDataString: string;
  public loadedFiles: Array<any> = [];
  public localLoadedFiles: Array<any> = [];
  public filesToDelete: Array<any> = [];
  public responseValidation: Array<any> = [];
  public fileStatus: number;
  public pdfStatus: number;
  public trackingErrorArr: Array<any> = [];
  public blob: any;
  public errorLeter: boolean;
  public errorLeterDownloaded: boolean;
  public errorLeterDuple: boolean;
  public numFilesErrors: number;
  public dateToday:Date;
  data : Array<any> = [];

  constructor(private readonly requestService: RequestService,
    public readonly dataComponent: DataComponentService, private readonly router: Router, private readonly crypto:EncryptService){
    this.loadingFile = false;
    this.errorLeter = false;
    this.errorLeterDownloaded = false;
    this.numFilesErrors = 0;
    this.excelDataString = "";
    this.fileStatus = 0;
    this.excelData = [];
    this.pdfStatus = 0;
    this.dateToday = new Date();
    this.environmentAgreements = "/"+ environment.pathAgreements;
    if (!dataComponent.getRatesToday()) {
      this.router.navigate([""]);
    }
  }

  ngOnInit(): void {
    localStorage.clear();
  }
  deleteFile(e:any){
    if (e.detail.item.status==="error") {
      this.errorLeter=false;
      this.errorLeterDownloaded=false;
      this.numFilesErrors=this.numFilesErrors-1;
    }else if (e.detail.item.status=== "loading") {
      this.loadingFile = false;
    }
    this.data.splice(e.detail.id,1)
    this.upload.nativeElement.listFiles = JSON.stringify(this.data);
  }
  public async importFile(event: any) {
    try {
      var start = window.performance.now();
      await this.excelToJson(event);
      const requestValidation = this.addFileLoadedSherpaComponent(event)
      if (requestValidation===false) {
        return;
      }
      this.responseValidation = await this.splitInvoice(requestValidation, this.requestService)
      this.waitResponseValidationExcel(this.responseValidation[0].fileStatus);
      this.pdfStatus = this.responseValidation[0].pdfStatus;
      this.excelDataString = JSON.stringify(this.excelData);
      this.loadingFile = false;
      this.pushFilesToHtml();
      var end = window.performance.now();
      console.log(`Load time: ${end - start} ms`);
    } catch (error) {
      console.log(error);
    }
  }
  async splitInvoice(fileData : any, excelService : any):Promise<any[]>{
    let splitData: any;
    let splitReponse: Array<any> = [];
    for (let i = 0; i < fileData.data.length; i += 20) {
      splitData = {
        'fileName' : fileData.fileName,
        'data': fileData.data.slice(i, i + 20)
      }
      const responseForEach = await excelService.addExcel(splitData);
      if (splitReponse.length===0) {
        splitReponse=splitReponse.concat(responseForEach);
      }else{
        if (responseForEach[0].pdfStatus===-2) {
          splitReponse[0].pdfStatus=-2;
        }
        if (responseForEach[0].fileStatus===-1) {
          splitReponse[0].fileStatus=-1;
        }
        splitReponse=splitReponse.concat(responseForEach.slice(1,responseForEach.length)
        );
      }
    }
    return splitReponse;
  }
  async waitResponseValidationExcel(fileS:any){
    this.fileStatus = fileS;
    this.excelDataString = JSON.stringify(this.excelData);
    this.loadingFile = false;
  }
  addErrorFormat(name: string){
    this.data.push({
      status: 'error',
      filename: name,
      actions: [
        {
          "icon":constants.deleteIco,
          "label":"Eliminar"
        }
      ],
      message:`El archivo no es compatible con el sistema.
      Recuerda usar el último formato Excel (xlsx) enviado por el especialista.`,
    });
    this.upload.nativeElement.listFiles = JSON.stringify(this.data);
    this.numFilesErrors = this.numFilesErrors+1;
  }
  addFileLoadedSherpaComponent(event:any){
    if (this.excelData.length===0) {
      this.addErrorFormat(event.detail.name)
      return false
    }
    this.loadingFile = true;
    const requestValidation: any = { fileName: this.fileName, data: this.excelData };
    this.data.push({
        status: 'loading',
        filename: event.detail.name
    });
    this.upload.nativeElement.listFiles = JSON.stringify(this.data);
    this.localStorageSaving(requestValidation);
    return requestValidation;
  }
  async excelToJson(event: any) {
    if (event.detail===undefined || typeof(event.detail)!== "object") {
      console.log(event);
      return
    }
    const file = event.detail;
    const fileReader = new FileReader();
    this.fileName = file.name;
    fileReader.readAsBinaryString(file);
    this.excelData = await new Promise<any>((resolve) => {
      fileReader.onload = () => {
        resolve(this.fileOnLoad(fileReader))
      }
    })
  }
  fileOnLoad(fileReader:any){
    const workBook:any = XLSX.read(fileReader.result, { type: 'binary' })
    const sheetNames = workBook.SheetNames;
    if (sheetNames.length===2 && sheetNames[1]==='LDF' && workBook.Sheets['LDF'] &&
      workBook.Sheets['LDF']['A1'] && workBook.Sheets['LDF']['A1'].h==="BdB-Factoring-Eternals" &&
      this.compareArrays(this.arrayHeaderFileExcel(workBook.Sheets[sheetNames[0]]))) {
      return (XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]))
    } else {
      return([])
    }
  }
  arrayHeaderFileExcel(sheetBook: any){
    var arHeders = [];
    for (let index = 0; index < 11; index++) {
      var sh = sheetBook[String.fromCharCode(65+index)+"1"];
      if(sh){
        arHeders.push(sh.h);
      }else{
        break;
      }
    }
    return arHeders;
  }
  compareArrays(ar1: Array<any>, ar2?: Array<any>): boolean{
    if (!ar2) {
      ar2 = ['NRO FACTURA', 'CUFE/CUDE', 'FECHA EXPEDICIÓN FACTURA',
      'FECHA VENCIMIENTO PROVEEDOR', 'NOMBRE PROVEEDOR', 'NIT PROVEEDOR', 'NOMBRE DEUDOR',
       'NIT DEUDOR', 'VIN', 'VALOR FACTURA RADIAN', 'VALOR FACTURA DESEMBOLSO']
    }
    if (ar1.length!==ar2.length) {
      return false;
    }
    for (let index = 0; index < ar1.length && index < ar2.length; index++) {
      if (ar1[index]!==ar2[index]) {
        return false;
      }
    }
    return true;
  }

  localStorageSaving(requestValidation: any) {
    let localStorageValidation = localStorage.getItem(this.crypto.encrypt("requestValidation"));
    if (localStorageValidation) {
      localStorageValidation = this.crypto.deencrypt(localStorageValidation)
      const previousValidation = JSON.parse(localStorageValidation);
      const totalValidations = [...previousValidation, requestValidation];
      localStorage.setItem("requestValidation", this.crypto.encrypt(JSON.stringify(totalValidations)));
    } else {
      localStorage.setItem("requestValidation", this.crypto.encrypt(JSON.stringify([requestValidation])));
    }
  }

  pushFilesToHtml() {
    const stackFile = this.data[this.data.length-1];
    if (!stackFile ||(stackFile.filename!==this.fileName || stackFile.status!== 'loading')) {
      return;
    }
    if (this.fileStatus === 1) {
      this.data.pop()
      this.data.push({
        status: 'success',
        filename: this.fileName,
        actions: [
          {
            "icon":constants.deleteIco,
            "label":"Eliminar"
          }
        ]
      });
      localStorage.setItem("fileSuccess", this.crypto.encrypt(JSON.stringify(this.data)));
      this.upload.nativeElement.listFiles = JSON.stringify(this.data);
      this.loadedFiles.push({ name: this.fileName, status: true, info: this.excelDataString });
      this.localLoadedFiles.push({ fileName: this.fileName, data: this.excelData });
      localStorage.setItem("localLoadedFiles", this.crypto.encrypt(JSON.stringify(this.localLoadedFiles)));
    }
    else if (this.fileStatus === -1) {
      this.numFilesErrors = this.numFilesErrors+1;
      this.errorLeter = true;
      this.data.pop()
      this.errorLeterDuple = false
      if (this.pdfStatus === -2) {
        this.errorLeterDuple = true;
        this.data.push({
          status: 'error',
          filename: this.fileName,
          actions: [
            {
              "icon":constants.deleteIco,
              "label":"Eliminar"
            }
          ],
          message:"El archivo contiene facturas que ya han sido cargadas.",
          linkButton:"Descargar carta de facturas duplicadas"
        });
      }
      else{
        this.data.push({
          status: 'error',
          filename: this.fileName,
          actions: [
            {
              "icon":constants.deleteIco,
              "label":"Eliminar"
            }
          ],
          message:"El archivo tiene errores en los campos.",
          linkButton:"Descargar carta de errores"
        });
      }
      this.upload.nativeElement.listFiles = JSON.stringify(this.data);
      this.loadedFiles.push({ name: this.fileName, status: false, info: this.excelDataString });
      this.trackingErrorArr.push({ name: this.fileName, status: false, info: this.excelDataString });
    }
    else {
      console.log("Error 500: Error interno del servidor, por favor intente nuevamente. Si el error persiste comuniquese con el area encargada.");
      alert("Error 500: Error interno del servidor, por favor intente nuevamente. Si el error persiste comuniquese con el area encargada.");
    }
  }
  public donwloadErrorsPdf() {
    try {
      this.requestService.getErrorsPdf(this.responseValidation).subscribe((data: any) => {
        this.blob = new Blob([data], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `${this.fileName}-Errores.pdf`;
        link.click();
        this.errorLeterDownloaded=true;
      });
    } catch (error) {
      console.log(error);
    }
  }
  public selectFilestoDelete(event: any) {
    const previousSelection = this.filesToDelete.indexOf(event.detail.card.title);
    if (previousSelection >= 0) {
      this.filesToDelete.splice(previousSelection, 1);
    } else {
      this.filesToDelete.push(event.detail.card.title);
    }
  }
  public deleteFiles() {
    this.loadedFiles = this.loadedFiles.filter(file => {
      return this.filesToDelete.indexOf(file.name) < 0;
    })
    this.trackingErrorArr = this.trackingErrorArr.filter(file => {
      return this.filesToDelete.indexOf(file.name) < 0;
    })
    this.filesToDelete = [];
  }
}
