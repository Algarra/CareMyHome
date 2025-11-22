'use client';

import { useRouter } from 'next/navigation';
import { AddressToCoordinates } from '../../molecules/addressToCoordinates/AddressToCoordinates';
import { localizedT } from '@/app/utils';

export const StartSearching = ({ actualLocale }: { actualLocale: string }) => {
	const t = localizedT(actualLocale);
	const router = useRouter();
	return (
		<div className='w-[80%]'>
			<AddressToCoordinates
				placeholder={'search input'}
				setCoordinates={(newCoordinates: [number, number]) => {
					router.push(
						`${t('localePath')}/search?lat=${newCoordinates[0].toString()}&lng=${newCoordinates[1].toString()}&zoom=6`
					);
				}}
				showButtonAlways
				onError={() => {
					router.push(`/search`);
				}}
				disableError
			/>
		</div>
	);
};
