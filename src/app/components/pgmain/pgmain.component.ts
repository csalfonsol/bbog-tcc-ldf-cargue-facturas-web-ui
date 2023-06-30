import { Component, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DataComponentService } from 'src/app/services/data-component.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { IBRDTFService } from 'src/app/services/ibrdtf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pgmain',
  templateUrl: './pgmain.component.html',
  styleUrls: ['./pgmain.component.scss']
})

export class PgmainComponent {
  @ViewChild('bannerRate') bannerRate!: ElementRef;
  public hoy: string;
  public loadStorage: boolean;
  public ratesCharged: boolean;
  public invoiceDisabled: boolean;
  public dateHoy:Date;
  public showText: boolean;
  public showTag: any;
  constructor(private readonly apiIbrDtf: IBRDTFService,
    public readonly dataComponent: DataComponentService,
    private readonly router: Router,
    private readonly crypto:EncryptService){
    this.dateHoy = new Date();
    this.hoy = `${this.dateHoy.getDate()}/${(this.dateHoy.getMonth()+1)}/${this.dateHoy.getFullYear()}`;
    this.ratesCharged=false;
    this.invoiceDisabled=true;
    this.showText = true;
    dataComponent.setFalsyRatesToday();
    this.apiIbrDtf.findFecha(this.hoy).subscribe(m => {
      this.tasasCargadasLocalS(Object.values(m)[0],localStorage.getItem(crypto.encrypt("tasas_cargadas"))===crypto.encrypt("true"))
      if (Object.values(m)[0]) {
        dataComponent.setTruthyRatesToday();
      }
    })
  }
  tasasCargadasLocalS(cargadasResp: boolean, cargadasStorage:boolean){
    this.ratesCharged = cargadasResp
    this.loadStorage = cargadasStorage
    this.loadStorage = true
      if ( this.ratesCharged && this.loadStorage)
      {
        this.ratesCharged= true;
        this.invoiceDisabled=true;
        this.showText = false;
        localStorage.setItem(this.crypto.encrypt("tasas_cargadas"),this.crypto.encrypt("false"));
      }else {
        this.showText = true;
        localStorage.setItem(this.crypto.encrypt("tasas_cargadas"),this.crypto.encrypt("true"));
      }
  }
  cargarTasas(event:any){
    if(event.detail.value === '0'){
      this.router.navigate([environment.pathTasas]);
    }else{
      this.router.navigate([environment.pathLoadFiles]);
    }
  }
  closeBanner(e:any){
    this.ratesCharged= true;
    this.showText = true;
    this.invoiceDisabled=true;
    this.dataComponent.setFalsyUpdateRate();
  }
}
