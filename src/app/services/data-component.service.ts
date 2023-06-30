import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataComponentService {
  private rateUpdated:boolean;
  private rateTodayLoaded:boolean;

  constructor() {
    this.rateUpdated = false;
    this.rateTodayLoaded = false;
  }
  getRatesToday(){
    return this.rateTodayLoaded;
  }
  setTruthyRatesToday(){
    this.rateTodayLoaded = true;
  }
  setFalsyRatesToday(){
    this.rateTodayLoaded = false;
  }
  getUpdateRate(){
    return this.rateUpdated;
  }
  setTruthyUpdateRate(){
    this.rateUpdated = true;
  }
  setFalsyUpdateRate(){
    this.rateUpdated = false;
  }
}
