import { Component } from '@angular/core';
import { BiensService } from '../biens.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BiensDataService } from '../biens-data-service.service';

@Component({
  selector: 'app-recherche-bien',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recherche-bien.component.html',
  styleUrls: ['./recherche-bien.component.css']
})

export class RechercheBienComponent {
  startDate: string = '';
  endDate: string = '';
  commune: string = '';
  maxPrice: number = 1000;
  minRooms: number = 1;
  minBeds: number = 1;
  maxDistance: number = 1000;
  form: NgForm;
  biens: any[]= [] ;

  constructor(private biensService: BiensService, private biensDataService: BiensDataService) {
    this.form = new NgForm([], []);
  }

  onSearch(form: NgForm) {
    const { startDate, endDate, commune, maxPrice, minRooms, minBeds, maxDistance } = form.value;
    this.biensService.searchBiens(startDate, endDate, commune, maxPrice, minRooms, minBeds, maxDistance).subscribe(
      (data) => {
        console.log('Search Results:', data);
        this.biensDataService.setBiens(data); // Mettre à jour les données dans le service
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
