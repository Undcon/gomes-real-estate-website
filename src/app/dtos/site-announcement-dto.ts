import { IdAndNameDto } from "./id-and-name-dto";

export interface SiteAnnouncementDto {
    id: number;
	title: string;
	description: string;
	type: IdAndNameDto;
	price: number;
	priceForRent: number;
	state: IdAndNameDto;
	city: IdAndNameDto;
	user: IdAndNameDto;
	district: string;
	address: string;
	addressNumber: string;
	cep: string;
	frontCoverUrl: string;
	availableForSale: boolean;
	availableForRent: boolean;
}
