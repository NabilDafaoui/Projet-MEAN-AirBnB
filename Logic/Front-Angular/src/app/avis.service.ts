import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost:8888/laisseravis';
  private apiUrl1 = 'http://localhost:8888/laisseravis/moyenne';

  constructor(private http: HttpClient) {}

  createAvis(avis: { idBien: number; note: number; commentaire: string }): Observable<any> {
    return this.http.post(this.apiUrl, avis);
  }

  getNoteMoyenne(idBien: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl1}/${idBien}`);
  }

  
}
