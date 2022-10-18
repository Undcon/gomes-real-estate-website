import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityDto } from '../dtos/city-dto';
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
  cities: CityDto[] = [];
  filters = new HomeFilter();
  isSearchButton = false;

  constructor(private service: AnnouncementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCities();
  }

  private loadCities() {
    this.service.getAnnouncementCities()
      .subscribe((cities: CityDto[]) => {
        this.cities = cities

        this.loadTypes();
      })
  }

  private loadTypes() {
    this.service.getAnnouncementTypes()
      .subscribe((pageItems: Page<SiteAnnouncementTypeDto>) => {
        this.types = pageItems.content

        this.loadParams();
      })
  }

  private loadParams() {
    this.route.queryParams
      .subscribe((params: any) => {
        if (!this.isSearchButton) {
          if (params.selectedCity) {
            const selected =  this.cities.find(c => c.id == params.selectedCity)
            if (selected) {
              this.filters.selectedCity = selected
            }
          }

          if (params.selectedTypes) {
            if (Array.isArray(params.selectedTypes)) {
              params.selectedTypes.forEach((id: number) => {
                const selected =  this.types.find(t => t.id == id)
                if (selected) {
                  this.filters.selectedTypes.push(selected)
                }
              });
            } else {
              const selected =  this.types.find(t => t.id == params.selectedTypes)
              if (selected) {
                this.filters.selectedTypes.push(selected)
              }
            }
          }
  
          if (params.minValue) {
            this.filters.minValue = params.minValue;
          }
  
          if (params.maxValue) {
            this.filters.maxValue = params.maxValue;
          }
  
          this.search();
        }
      }
    );
  }

  public onSearch() {
    this.isSearchButton = true;
    this.search();
    this.addParams();
  }

  private search() {
    this.adPagerComponent.onSearch(this.filters);
  }

  private addParams() {
    const typeIds: number[] = [];
    this.filters.selectedTypes.forEach(type => {
      typeIds.push(type.id);
    })

    this.router.navigate(['/home'], { queryParams: { selectedCity: this.filters.selectedCity?.id, selectedTypes: typeIds, minValue: this.filters.minValue, maxValue: this.filters.maxValue } });
  }
}
