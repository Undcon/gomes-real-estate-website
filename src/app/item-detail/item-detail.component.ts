import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteAnnouncementDto } from '../dtos/site-announcement-dto';
import { AnnouncementService } from '../services/announcement.service';
import { FileDto } from '../dtos/file-dto';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailComponent implements OnInit {

  public isMobile = false;
  public innerWidth: any;
  public loading = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public responsiveOptions: any[] = [
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

  public fileImages: FileDto[] = []

  constructor(private activatedRoute: ActivatedRoute, private service: AnnouncementService) { }

  public entity: SiteAnnouncementDto | undefined;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.activatedRoute.paramMap.subscribe(params => { 
      const id = params.get('id');
      if (id) {
        this.loadAnnouncement(parseInt(id));
      }
    });
  }

  private loadAnnouncement(id: number) {
    this.service.getAnnouncement(id)
    .subscribe({
      next: (res) => {
        this.entity = res
        this.loadImages()
      },
      error: (err: Error) => console.error('Observer got an error: ' + err)
    })
  }

  public loadImages() {
    if (this.entity) {
      this.service.getAllAttachment(this.entity.id)
      .subscribe({
        next: (files) => {
          this.fileImages = files
          this.loading = false;
        },
        error: (err: Error) => console.error('Não foi possível carregar os anexos. ' + err)
      })
    }
  }

  public sendMessage() {
    let message = `Olá, gostaria de saber mais sobre *${this.entity?.title}*`
    message += `\n*URL:* ${window.location.href}`
    
    const location = this.getGoogleLocation();
    if (location) {
      message += `\n\n*Endereço:* https://www.google.com.br/maps/place/${location}`;
    }

    const send = `https://web.whatsapp.com/send?phone=5547996141769&text=${window.encodeURIComponent(message)}`;
    window.open(send, '_blank');
  }

  public openMaps() {
    window.open(`https://www.google.com.br/maps/place/${this.getGoogleLocation()}`, '_blank');
  }

  public getGoogleLocation() {
    let location = null;

    if (this.entity?.address) {
      location = this.entity?.address;
    }

    if (this.entity?.addressNumber) {
      if (location) {
        location += `, ${this.entity?.addressNumber}`
      } else {
        location = this.entity?.addressNumber
      }
    }

    if (this.entity?.district) {
      if (location) {
        location += ` - ${this.entity?.district}`
      } else {
        location = this.entity?.district
      }
    }

    if (this.entity?.city && this.entity?.city.name) {
      if (location) {
        location += `, ${this.entity?.city.name}`
      } else {
        location = this.entity?.city.name
      }
    }

    if (this.entity?.state && this.entity?.state) {
      if (location) {
        location += ` - ${this.entity?.state?.name}`
      } else {
        location = this.entity?.state?.name
      }
    }

    return location ? location?.toString().replace(/ /g, '+') : null;
  }
}
