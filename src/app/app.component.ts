import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'gomes-real-estate-website';

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.

     if(pos == max)   {
      console.log("igual")
     } else {

      console.log("NAO")
     }
  }

  openHome() {
    window.open('http://localhost:4200/home');
  }

  openUndcon() {
    window.open('https://undcon.com.br', '_blank');
  }
}
