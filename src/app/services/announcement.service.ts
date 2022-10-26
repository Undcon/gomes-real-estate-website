import { Injectable } from '@angular/core';
import { SiteAnnouncementDto } from '../dtos/site-announcement-dto';
import { Page } from '../dtos/page';
import { EntityService } from './entity.service';
import { QueryFilterEnum } from '../enum/query-filter';
import { Observable } from 'rxjs';
import { SiteAnnouncementTypeDto } from '../dtos/site-announcement-type-dto';
import { HomeFilter } from '../dtos/home-filter';
import { FileDto } from '../dtos/file-dto';
import { CityDto } from '../dtos/city-dto';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  
  constructor(private entityService: EntityService) { }

  public getAnnouncements(page: number, size: number, homeFilter: HomeFilter, order: string): Observable<Page<SiteAnnouncementDto>> {
    const filters = this.getFilters(homeFilter)
    return this.entityService.getAllCustomUrl("/site/announcement/public", page, size, filters, order);
  }

  public getAnnouncementTypes(): Observable<Page<SiteAnnouncementTypeDto>> {
    return this.entityService.getAllCustomUrl("/site/announcementtype/public", 0, 100);
  }

  public getAnnouncementCities(): Observable<CityDto[]> {
    return this.entityService.getAllCustomUrl("/site/announcement/public/cities");
  }

  public getAnnouncement(id: number): Observable<SiteAnnouncementDto> {
    return this.entityService.get("/site/announcement/public", id);
  }
  
  private getFilters(homeFilter: HomeFilter | undefined) {
    const filters = new Map<string, string>();

    if (homeFilter) {
      const priceFilter = homeFilter.available == 'comprar' ? 'price' : 'priceForRent';

      if (homeFilter.minValue) {
        filters.set(this.getQueryFilter(priceFilter, QueryFilterEnum.BIGGER_EQUAL), homeFilter.minValue)
      }

      if (homeFilter.maxValue) {
        filters.set(this.getQueryFilter(priceFilter, QueryFilterEnum.SMALLER_EQUAL), homeFilter.maxValue)
      }

      if (homeFilter.selectedCity) {
        filters.set(this.getQueryFilter('city.id', QueryFilterEnum.EQUALS), homeFilter.selectedCity.id.toString())
      }

      if (homeFilter.selectedType) {
        filters.set(this.getQueryFilter('type.id', QueryFilterEnum.EQUALS), homeFilter.selectedType.id.toString())
      }

      if (homeFilter.available) {
        if (homeFilter.available === 'comprar') {
          filters.set(this.getQueryFilter('availableForSale', QueryFilterEnum.EQUALS), 'true');
        } else if (homeFilter.available === 'alugar') {
          filters.set(this.getQueryFilter('availableForRent', QueryFilterEnum.EQUALS), 'true')
        }
      }
    }

    return filters;
  }

  public getAllAttachment(id: number): Observable<FileDto[]> {
    return this.entityService.getCustomUrl(
      `/site/announcement/public/${id}/attachments`
    );
  }

  private getQueryFilter(field: string, operation: QueryFilterEnum) {
    return `${field}${operation}`;
  };
}