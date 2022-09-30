import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'gomes-real-estate-website';

  openHome() {
    window.open('http://localhost:4200/home');
  }

  openUndcon() {
    window.open('https://undcon.com.br', '_blank');
  }
}
