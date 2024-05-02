import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiensService {
  private apiUrl = 'http://localhost:8888/biens';

  constructor(private http: HttpClient) { }

  getBiens(): Observable<any> {
    let biens:Observable<any> = this.http.get(this.apiUrl);
    biens.subscribe(data =>{
      console.log("DATA getBiens");
      console.log(data);
    });

    return biens 
  }

  searchBiens(startDate: string, endDate: string, commune: string, maxPrice: number, minRooms: number, minBeds: number, maxDistance: number): Observable<any> {
    let searchUrl: string;
    
    if (commune) {
      // Recherche avec une commune spécifique
      searchUrl = `${this.apiUrl}/recherche/${commune}/${minBeds}/${maxPrice}/${minRooms}/${maxDistance}`;
    } else {
      // Recherche sans commune spécifiée (toutes les communes)
      searchUrl = `${this.apiUrl}/recherche/${minBeds}/${maxPrice}/${minRooms}/${maxDistance}`;
    }
    
    console.log("Search URL:", searchUrl);
     return this.http.get<any[]>(searchUrl);
  }
  
  
  
}
