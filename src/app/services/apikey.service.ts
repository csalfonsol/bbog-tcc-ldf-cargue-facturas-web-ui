import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApikeyService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = environment.apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
