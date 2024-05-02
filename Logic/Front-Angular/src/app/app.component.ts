import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RechercheBienComponent } from './recherche-bien/recherche-bien.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent ,RechercheBienComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-Angular';
}
