import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { HomeFilter } from 'src/app/dtos/home-filter';
import { Page } from 'src/app/dtos/page';
import { SiteAnnouncementDto } from 'src/app/dtos/site-announcement-dto';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'ad-pager',
  templateUrl: './ad-pager.component.html',
  styleUrls: ['./ad-pager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdPagerComponent {

  announcements: SiteAnnouncementDto[] = [];
  totalItems = 0;
  skeletonArray = new Array(9);
  loading = true;
  filters = new HomeFilter();

  constructor(private service: AnnouncementService, private router: Router) { }

  openDetail(announcement: SiteAnnouncementDto) {
    this.router.navigate([`detail/${announcement.id}`]);
  }

  onLoadData(lazyLoadEvent: LazyLoadEvent) {
    this.loading = true;
    let page = 0;
    let rows = 9;
    if (lazyLoadEvent && lazyLoadEvent.first && lazyLoadEvent.rows) {
      page = lazyLoadEvent.first / lazyLoadEvent.rows;
      rows = lazyLoadEvent.rows;
    }

    this.loadData(page, rows);
  }

  private loadData(page = 0, rows = 9) {
    this.service.getAnnouncements(page, rows, this.filters)
      .subscribe((pageItems: Page<SiteAnnouncementDto>) => {
        this.announcements = pageItems.content
        this.totalItems = pageItems.totalElements
        this.loading = false;
      })
  }

  onSearch(filters: HomeFilter) {
    this.loading = true;
    this.filters = filters;
    this.loadData();
  }
}
