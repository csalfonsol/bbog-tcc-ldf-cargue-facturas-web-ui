import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { dialogMessages } from 'src/app/core/Messages/messages';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @ViewChild('modal') modal: ElementRef;
  public currentRoute:string;
  public backRoute:string;
  public navegacionBtnAtras:Map <string,string>;
  public hidenBtnBack: boolean;
  public messageModal: string;
  public titleModal: string;
  constructor(private readonly router: Router) {
    this.hidenBtnBack=false;
    this.navegacionBtnAtras = new Map();
    this.setNavigation();
    this.messageModal="";
    this.titleModal="";
    this.router.events.subscribe((event: Event) => {
      this.eventRoute(event)
    });
  }

  eventRoute(event: Event){
    if (event instanceof NavigationEnd) {
      this.currentRoute = event.url.substring(1);
      if (this.currentRoute==="") {
        this.hidenBtnBack=true;
      }else{
        this.hidenBtnBack=false;
      }
    }
  }
  String(tx:any){
    return String(tx)
  }
  setNavigation(){
    this.navegacionBtnAtras.set("","");
    this.navegacionBtnAtras.set(environment.pathTasas,"");
    this.navegacionBtnAtras.set(environment.pathLoadFiles,"");
    this.navegacionBtnAtras.set(environment.pathAgreements,environment.pathLoadFiles);
    this.navegacionBtnAtras.set(environment.pathDonwload,environment.pathLoadFiles);
  }
  goBack(){
    this.backRoute = [this.navegacionBtnAtras.get(this.currentRoute)].toString();
    if (this.currentRoute===environment.pathTasas) {
      this.messageModal= dialogMessages.backHeaderFromRatesMessage;
      this.titleModal = dialogMessages.backHeaderToPgMainTitle;
      this.modal.nativeElement.openAlert();
    } else if(this.currentRoute===environment.pathLoadFiles){
      this.messageModal= dialogMessages.backHeaderFromLoadFMessage;
      this.titleModal = dialogMessages.backHeaderToPgMainTitle;
      this.modal.nativeElement.openAlert();
    }else if (this.currentRoute===environment.pathAgreements) {
      this.messageModal= dialogMessages.backHeaderToLoadFMessage;
      this.titleModal = dialogMessages.backHeaderToLoadFTitle;
      this.modal.nativeElement.openAlert();
    }else if (this.currentRoute===environment.pathDonwload) {
      this.messageModal= dialogMessages.backHeaderFromLDownloadFMessage;
      this.titleModal = dialogMessages.backHeaderToLoadFTitle;
      this.modal.nativeElement.openAlert();
  }else{
      this.router.navigate([this.backRoute]);
    }
  }
  btnModal(event : any){
    if (event.detail.value==="Si, continuar") {
      this.router.navigate([this.backRoute]);
    }
    console.log(event);
  }
}
