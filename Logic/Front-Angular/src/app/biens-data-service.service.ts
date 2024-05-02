import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiensDataService {
  private biensSource = new BehaviorSubject<any[]>([]);
  biens$ = this.biensSource.asObservable();

  setBiens(biens: any[]) {
    this.biensSource.next(biens);
  }
}
