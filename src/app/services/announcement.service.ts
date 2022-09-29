import { Injectable } from '@angular/core';
import { SiteAnnouncementDto } from '../dtos/site-announcement-dto';
import { Page } from '../dtos/page';
import { EntityService } from './entity.service';
import { QueryFilterEnum } from '../enum/query-filter';
import { Observable } from 'rxjs';
import { SiteAnnouncementTypeDto } from '../dtos/site-announcement-type-dto';
import { HomeFilter } from '../dtos/home-filter';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  
  constructor(private entityService: EntityService) { }

  public getAnnouncements(page: number, size: number, homeFilter?: HomeFilter): Observable<Page<SiteAnnouncementDto>> {
    const filters = this.getFilters(homeFilter)
    return this.entityService.getAllCustomUrl("/site/announcement/public", page, size, filters);
  }

  public getAnnouncementTypes(): Observable<Page<SiteAnnouncementTypeDto>> {
    return this.entityService.getAllCustomUrl("/site/announcementtype/public", 0, 100);
  }
  
  private getFilters(homeFilter: HomeFilter | undefined) {
    const filters = new Map<string, string>();

    if (homeFilter) {
      if (homeFilter.selectedTypes) {
        homeFilter.selectedTypes.forEach(type => {
          filters.set(this.getQueryFilter('type.id', QueryFilterEnum.EQUALS), type.id.toString())
        })
      }

      if (homeFilter.minValue) {
        filters.set(this.getQueryFilter('price', QueryFilterEnum.BIGGER_EQUAL), homeFilter.minValue)
      }

      if (homeFilter.maxValue) {
        filters.set(this.getQueryFilter('price', QueryFilterEnum.SMALLER_EQUAL), homeFilter.maxValue)
      }
    }
    return filters;
  }

  private getQueryFilter(field: string, operation: QueryFilterEnum) {
    return `${field}${operation}`;
  };
}