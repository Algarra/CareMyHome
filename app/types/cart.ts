import { CalculatePriceParams } from '@algarra/roomsolvers-utils';

export type CartItem = CalculatePriceParams & {
	product: any; // TDOD: set type this was from Roomsolvers and types was wrong
	path?: string;
};
