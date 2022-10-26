import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'gomes-real-estate-website';


  constructor(private router: Router, private metaTagService: Meta) {
    this.addMetaTag();
  }

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

  private addMetaTag() {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'Gestão de Imóveis, Imóvel, Terreno, Apartamento, Sítio, Compras, Vender, Alugar, Comprar, Imobiliária, Gestão',
      },
      { name: 'author', content: 'Imobiliária Mateus Gomes' },
      { name: 'description', content: 'Imobiliária Mateus Gomes - Locação e Venda de Imóveis' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { charset: 'UTF-8' },
    ]);
  }

  openHome() {
    this.router.navigate([`home`]);
  }

  openUndcon() {
    window.open('https://undcon.com.br', '_blank');
  }

  sendMessage() {
    const send = `https://web.whatsapp.com/send?phone=${environment.phoneNumber}`;
    window.open(send, '_blank');
  }
}
