import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
