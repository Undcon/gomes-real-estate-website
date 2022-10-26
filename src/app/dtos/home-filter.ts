import { CityDto } from "./city-dto";
import { SiteAnnouncementTypeDto } from "./site-announcement-type-dto";

export class HomeFilter {
    minValue = null;
    maxValue = null;
    selectedType: SiteAnnouncementTypeDto | undefined;
    selectedCity: CityDto | undefined;
    available: string = 'comprar';
}