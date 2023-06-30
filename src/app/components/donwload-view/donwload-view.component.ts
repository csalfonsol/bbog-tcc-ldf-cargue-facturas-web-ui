import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { dialogMessages } from 'src/app/core/Messages/messages';
import { DataComponentService } from 'src/app/services/data-component.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-donwload-view',
  templateUrl: './donwload-view.component.html',
  styleUrls: ['./donwload-view.component.scss']
})
export class DonwloadViewComponent {
  @ViewChild('upload') upload!: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  data : any = [];
  e:any;
  dateToday: Date;
  showBanner: boolean;
  showText: boolean;
  titleModal: string;
  messageModal: string;
  loadFiles: { status: string; filename: string; isDelete: string; }[];
  ngOnInit(): void {
    this.dateToday = new Date();
    this.showText = true;
    this.showBanner = false;
    this.titleModal = "";
    this.messageModal = "";
  }

  loadFile(e: any){
    console.log(e)
  }

  ngAfterViewInit(e:any) {
    const day = `${(this.dateToday.getDate())}`.padStart(2,'0');
    const month = `${(this.dateToday.getMonth()+1)}`.padStart(2,'0');
    const year = this.dateToday.getFullYear();
    const fileName = "Consolidado - " + `${day}_${month}_${year}` + '.xlsx'
    this.loadFile({detail:{name:""}})
    this.data.push({
      status: 'success',
      filename: fileName,
      isView: false,
      isDelete: false,
      })
    this.upload.nativeElement.listFiles = JSON.stringify(this.data);
  }

  constructor(private readonly requestService: RequestService,
    public readonly dataComponent: DataComponentService, private readonly router: Router) {
    if (!dataComponent.getRatesToday()) {
      this.router.navigate([""]);
    }
  }

  closeBannerDownloadFile(e:any){
    this.showBanner = false;
    this.showText = true;
  }
  donwloadLiberaFile() {
    this.showBanner = true;
    this.showText = false;
    this.requestService.getDownloadLiberaFile().then(response => {
      const urlArchivo = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      const day = `${(this.dateToday.getDate())}`.padStart(2,'0');
      const month = `${(this.dateToday.getMonth()+1)}`.padStart(2,'0');
      const year = this.dateToday.getFullYear();
      link.href = urlArchivo;
      link.download = "Consolidado - " + `${day}_${month}_${year}` + '.xlsx'
      link.click();
        window.URL.revokeObjectURL(urlArchivo);
    }).catch(error => {
        console.log(error);
    });
  }
  goHome(){
    this.messageModal= dialogMessages.backHeaderFromLDownloadFMessage;
    this.titleModal = dialogMessages.backHeaderToLoadFTitle;
    this.modal.nativeElement.openAlert();
  }
  btnModal(event : any){
    if (event.detail.value==="Si, continuar") {
      this.router.navigate([""]);
      this.messageModal= "";
      this.titleModal = "";
    }
  }
}
