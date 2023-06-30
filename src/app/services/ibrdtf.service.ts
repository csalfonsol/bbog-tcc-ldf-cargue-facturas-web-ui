import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TasasIbrI } from '../core/models/ibrdtfInterface';
import { ApikeyService } from 'src/app/services/apikey.service';

@Injectable({
  providedIn: 'root'
})
export class IBRDTFService {

  constructor(private readonly http: HttpClient, private readonly apikeyService: ApikeyService) {}

    private getHeaders(): HttpHeaders {
      const apiKey = this.apikeyService.getApiKey();
          return new HttpHeaders().set('x-api-key', apiKey);
    }

  findFecha(fecha: string){
    const headers = this.getHeaders();
    return  this.http.post(environment.apiTasasUrl,
      {
        "date": fecha//.toLocaleDateString()
      },{ headers });
  }
  getTasas(fecha:string){
    const headers = this.getHeaders();
    return this.http.post(environment._url+"V1/rateByDate", { "date": fecha }, { headers }); //get_rate
  }
  postTasas(tasas: TasasIbrI){
    const headers = this.getHeaders();
    return this.http.post(environment._url+"V1/createRate", tasas, { headers }) //create_rate
  }
  updateTasas(tasas: TasasIbrI) {
    const headers = this.getHeaders();
    return  this.http.post(environment._url+"V1/updateRate",tasas, { headers });  } //update_rate
}
