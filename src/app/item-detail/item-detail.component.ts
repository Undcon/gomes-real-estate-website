import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map } from 'ol';
import { OSM } from 'ol/source';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import { SiteAnnouncementDto } from '../dtos/site-announcement-dto';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailComponent implements OnInit {

  public isMobile = false;
  public innerWidth: any;
  public map!: Map;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  images = [
    "https://resizedimgs.vivareal.com/crop/286x200/named.images.sp/6bfca16459a5d097c924846cf43d636e/foto-1-de-imovel-comercial-com-6-quartos-a-venda-1400m-em-praia-de-pipa-tibau-do-sul.jpg",
    "https://www.imobiliariaalpha.com.br/imagens/15239897785ad63d1244628149740785.jpg",
    "https://resizedimgs.zapimoveis.com.br/crop/420x236/named.images.sp/537235714273317e47e0bf548ddef2a3/casa-de-condominio-com-4-quartos-a-venda-250m-no-centro-lagoa-santa.jpg",
    "https://b6d3c5t3.rocketcdn.me/wp-content/uploads/2014/05/excelente-casa-com-piscina-a-venda-em-busca-vida-10.jpg",
    "https://www.chavesnamao.com.br/imn/0358x0250/N/imoveis/190252/7559324/pr-tres-barras-do-parana-terreno-a-venda-62752a7a-2.jpg",
    "https://www.chaves.imb.br/portal/galerias/464/02.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG0v4xDb-WVfQBchCdBvxwlIWLoIh2y4g8lg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0FdLM_zKMIc1biFbuqYf4AcMWy55YSwQ-Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSHs53LCvlZB1aakKCR9xXvbRmJeggEUrSKw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vfvHc3ToQ154TKT4c7_9PBeJOk5gTPv0KQ&usqp=CAU"
  ];

  full = false

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private activatedRoute: ActivatedRoute) { }

  obj: SiteAnnouncementDto | undefined;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.obj = JSON.parse(this.activatedRoute.snapshot.params['announcement']) as SiteAnnouncementDto;

    // this.obj.description = this.obj.description.replace(/\"/gi, "'")
    console.log(this.obj.description)
    console.log(this.obj)

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [0, 0],
        zoom: 2,
        maxZoom: 18
      })
    });
    

    const el = document.getElementById('popup')
    if (el) {
      const popup = new Overlay({
        element: el
      });
      // [-26.9443846,-49.074361,17]
      popup.setPosition(fromLonLat([-26.9443846, -49.074361]));
      this.map.addOverlay(popup);
    }
  }

  sendMessage() {
    let message = `Olá, gostaria de saber mais sobre *${this.obj?.title}*`
    
    const location = this.getClientLocation();
    if (location) {
      message += `\nEndereço: https://www.google.com.br/maps/place/${location}`;
    }

    const send = `https://web.whatsapp.com/send?phone=5547996141769&text=${window.encodeURIComponent(message)}`;
    window.open(send, '_blank');
  }

  public getClientLocation() {
    let location = null;

    if (this.obj?.address) {
      location = this.obj?.address;
    }

    if (this.obj?.addressNumber) {
      if (location) {
        location += `, ${this.obj?.addressNumber}`
      } else {
        location = this.obj?.addressNumber
      }
    }

    if (this.obj?.district) {
      if (location) {
        location += ` - ${this.obj?.district}`
      } else {
        location = this.obj?.district
      }
    }

    if (this.obj?.city && this.obj?.city.name) {
      if (location) {
        location += `, ${this.obj?.city.name}`
      } else {
        location = this.obj?.city.name
      }
    }

    if (this.obj?.state && this.obj?.state) {
      if (location) {
        location += ` - ${this.obj?.state}`
      } else {
        location = this.obj?.state
      }
    }

    return location ? location?.toString().replace(/ /g, '+') : null;
  }







  
}
