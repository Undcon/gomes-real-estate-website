import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HomeFilter } from '../dtos/home-filter';
import { Page } from '../dtos/page';
import { SiteAnnouncementTypeDto } from '../dtos/site-announcement-type-dto';
import { AnnouncementService } from '../services/announcement.service';
import { AdPagerComponent } from './ad-pager/ad-pager.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  @ViewChild(AdPagerComponent, {static: false})
  adPagerComponent!: AdPagerComponent;

  types: SiteAnnouncementTypeDto[] = [];
  filters = new HomeFilter();

  constructor(private service: AnnouncementService) { }

  ngOnInit(): void {
    this.loadTypes()
  }

  private loadTypes() {
    this.service.getAnnouncementTypes()
      .subscribe((pageItems: Page<SiteAnnouncementTypeDto>) => {
        this.types = pageItems.content
        // this.loading = false;
      })
  }

  public onSearch() {
    this.adPagerComponent.onSearch(this.filters)
  }
}
