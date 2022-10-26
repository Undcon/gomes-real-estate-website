import { Component, ViewEncapsulation } from '@angular/core';
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
  loading = false;
  filters = new HomeFilter();
  selectedOrder = 'title ASC';
  orders = [
    { label: 'Menor Valor', value: 'minValue' },
    { label: 'Maior Valor', value: 'maxValue' },
    { label: 'Recentes', value: 'recent' }
  ]

  constructor(private service: AnnouncementService, private router: Router) { }

  openDetail(announcement: SiteAnnouncementDto) {
    this.router.navigate([`detail/${announcement.id}`]);
  }

  onLoadData(lazyLoadEvent: LazyLoadEvent | null) {
    let page = 0;
    let rows = 12;
    if (lazyLoadEvent && lazyLoadEvent.first && lazyLoadEvent.rows) {
      page = lazyLoadEvent.first / lazyLoadEvent.rows;
      rows = lazyLoadEvent.rows;
    }

    this.loadData(page, rows);
  }

  private loadData(page = 0, rows = 12) {
    this.service.getAnnouncements(page, rows, this.filters, this.selectedOrder)
      .subscribe((pageItems: Page<SiteAnnouncementDto>) => {
        this.announcements = pageItems.content
        this.totalItems = pageItems.totalElements
        this.loading = false;
      })
  }

  onSearch(filters: HomeFilter) {
    this.loading = true;
    this.filters = filters;
    this.onLoadData(null);
  }

  setSelectedOrder(value: string) {
    const priceFilter = this.filters.available == 'comprar' ? 'price' : 'priceForRent';

    if (value === 'minValue') {
      this.selectedOrder = `${priceFilter} ASC`;
    } else if (value === 'maxValue') {
      this.selectedOrder = `${priceFilter} DESC`;
    } else if (value === 'recent') {
      this.selectedOrder = 'registerDate DESC';
    } else {
      this.selectedOrder = 'title ASC';
    }

    this.onLoadData(null);
  }

  public hasFilters() {
    return this.filters && (this.filters.maxValue || this.filters.minValue || this.filters.selectedCity?.id || this.filters.selectedType?.id); 
  }
}
