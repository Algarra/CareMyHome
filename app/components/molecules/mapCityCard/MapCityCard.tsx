'use client';
import { FC, memo } from 'react';
import { localizedT } from '../../../utils';
import Link from 'next/link';
import { OutlinedButton } from '../../atoms/buttons/outlinedButton';
import { TextButton } from '../../atoms/buttons/textButton';
import { useUserStore } from '../../../zustand/user';
import { currencyExchange } from '@algarra/roomsolvers-utils';
import { currencySymbols } from '../../../utils/currencies';
import { tshirtSizes } from '../../theme/tshirtSizes';
import { CrossIcon } from '../../theme/icons/Cross';

export type MapCityCardProps = {
	actualLoacale: string;
	costOfliving: number;
	rentCostForNomads1bed: number;
	rentCostForNomads2bed: number;
	rentCostForNomads3bed: number;
	groceries: number;
	normalRestaurantPrice: number;
	cityPath: string;
};

export const MapCityCard: FC<MapCityCardProps> = memo(
	({
		costOfliving,
		rentCostForNomads1bed,
		rentCostForNomads2bed,
		rentCostForNomads3bed,
		groceries,
		normalRestaurantPrice,
		actualLoacale,
		cityPath,
	}) => {
		const t = localizedT(actualLoacale);
		const expectedCurrency = useUserStore(state => state.currencySelected);
		const exchangeRates = useUserStore(state => state.currenciesExchanges);

		return (
			<div className=' relative w-60 -mr-8 -ml-6 -my-[15px] rounded-md  '>
				<TextButton
					size={tshirtSizes.EXTRA_SMALL}
					buttonClasses=' absolute -top-1 -right-2 z-10 '
					onClick={() => {
						document.dispatchEvent(new Event('RS-close-map-popups'));
					}}
				>
					<span className=' bg-slate-200/90 hover:bg-slate-200/50 -m-1 p-2 rounded-full text-black '>
						<CrossIcon size={2} />
					</span>
				</TextButton>
				<section className=' pb-4 px-3 pt-9'>
					<div className=' px-4 mx-auto text-center '>
						<dl className='grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-3 '>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{(
										(currencyExchange({
											defaultValue: {
												amount: costOfliving,
												currency: 'USD',
											},
											expectedCurrency,
											exchangeRates,
										}) +
											rentCostForNomads1bed) /
										1000
									).toFixed(2)}
									K {currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 '>Living</dd>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{currencyExchange({
										defaultValue: {
											amount: groceries,
											currency: 'USD',
										},
										expectedCurrency,
										exchangeRates,
									}).toFixed(2)}{' '}
									{currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 '>Groceries</dd>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{currencyExchange({
										defaultValue: {
											amount: normalRestaurantPrice,
											currency: 'USD',
										},
										expectedCurrency,
										exchangeRates,
									}).toFixed(2)}{' '}
									{currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 whitespace-nowrap'>Restaurant</dd>
							</div>
						</dl>
					</div>
					<div className=' px-4 mt-2 mx-auto text-center '>
						<dl className=' gap-8 mx-auto text-gray-900 mb-2'>Avergage rent for a nomad:</dl>
						<dl className='grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-3 '>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{(
										currencyExchange({
											defaultValue: {
												amount: rentCostForNomads1bed,
												currency: 'USD',
											},
											expectedCurrency,
											exchangeRates,
										}) / 1000
									).toFixed(2)}
									K {currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 whitespace-nowrap'>1 room</dd>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{(
										currencyExchange({
											defaultValue: {
												amount: rentCostForNomads2bed,
												currency: 'USD',
											},
											expectedCurrency,
											exchangeRates,
										}) / 1000
									).toFixed(2)}
									K {currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 whitespace-nowrap'>2 rooms</dd>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<dt className='mb-1 text-1xl font-extrabold whitespace-nowrap'>
									{(
										currencyExchange({
											defaultValue: {
												amount: rentCostForNomads3bed,
												currency: 'USD',
											},
											expectedCurrency,
											exchangeRates,
										}) / 1000
									).toFixed(2)}
									K {currencySymbols[expectedCurrency]}
								</dt>
								<dd className='font-light text-gray-500 whitespace-nowrap'>3 rooms</dd>
							</div>
						</dl>
					</div>
				</section>
				<div className='absolute top-1 left-1'>
					<Link title='property link' href={`${t('localePath')}/search/city/${cityPath}`}>
						<OutlinedButton size={tshirtSizes.EXTRA_SMALL}>Check it</OutlinedButton>
					</Link>
				</div>
			</div>
		);
	}
);

MapCityCard.displayName = 'MapCityCard';
