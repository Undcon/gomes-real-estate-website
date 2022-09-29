import { SiteAnnouncementTypeDto } from "./site-announcement-type-dto";

export class HomeFilter {
    minValue = null;
    maxValue = null;
    selectedTypes: SiteAnnouncementTypeDto[] = [];
}