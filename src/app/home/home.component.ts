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
  availabilities = [
    {label: 'Comprar', value: 'comprar'},
    {label: 'Alugar', value: 'alugar'}
  ];

  constructor(private service: AnnouncementService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (!params.available) {
          this.addParams();
        } else if (!this.isSearchButton) {
          if (params.selectedCity) {
            const selected =  this.cities.find(c => c.id == params.selectedCity)
            if (selected) {
              this.filters.selectedCity = selected
            }
          }

          if (params.selectedType) {
            const selected =  this.types.find(c => c.id == params.selectedType)
            if (selected) {
              this.filters.selectedType = selected
            }
          }
  
          if (params.minValue) {
            this.filters.minValue = params.minValue;
          }
  
          if (params.maxValue) {
            this.filters.maxValue = params.maxValue;
          }

          if (params.available) {
            this.filters.available = params.available;
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
    this.router.navigate(['/'], { queryParams: { selectedCity: this.filters.selectedCity?.id, selectedType: this.filters.selectedType?.id, minValue: this.filters.minValue, maxValue: this.filters.maxValue, available: this.filters.available } });
  }

  public hasFilters() {
    return (this.filters && (this.filters.maxValue || this.filters.minValue || this.filters.selectedCity?.id || this.filters.selectedType?.id)) ? true : false; 
  }

  public changeAvailable(value: string) {
    this.filters.available = value;
    this.addParams();
  }
}
