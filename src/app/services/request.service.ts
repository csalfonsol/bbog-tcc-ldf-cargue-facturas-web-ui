import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApikeyService } from 'src/app/services/apikey.service';


@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private readonly http: HttpClient,
              private readonly apikeyService: ApikeyService,
              ) { }

  private getHeaders(): HttpHeaders {
    const apiKey = this.apikeyService.getApiKey();
      return new HttpHeaders().set('x-api-key', apiKey);
  }
  public addExcel(excelData: any): Promise<any>  {
    const url = `${environment.apiUrl}`;
    const headers = this.getHeaders();
    return this.http.post(url, excelData, { headers }).toPromise();
  }
  public getErrorsPdf(errorsData: any) {
    const url = `${environment.pdfUrl}`;
    const headers = this.getHeaders();
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post(url, errorsData, options,);
  }
  public getAgreements(data: any): Promise<any> {
    const url = `${environment.agreementsUrl}`;
    const headers = this.getHeaders();
    return this.http.post(url, data, { headers }).toPromise();
  }
  public calculate(data: any): Promise<any> {
    const url = `${environment.calculateUrl}`;
    const headers = this.getHeaders();
    return this.http.post(url, data, { headers }).toPromise();
  }
  getDownloadLiberaFile(): Promise<Blob> {
    const url = `${environment.donwloadLiberaFile}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers, responseType: 'blob' }).toPromise() as Promise<Blob>;
  }
}

