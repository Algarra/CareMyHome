import { ChangeEvent } from 'react';
import { toggleColorsClasses } from './utils';
import { twMerge } from 'tailwind-merge';
import { Colors } from '../../theme/colors';

export const Toggle = ({
	checked,
	label,
	handleOnChange,
	color = Colors.BLUE,
	wrapperClasses,
	togglelasses,
}: {
	wrapperClasses?: string;
	togglelasses?: string;
	checked: boolean;
	label?: string;
	handleOnChange: (active: ChangeEvent<HTMLInputElement>) => void;
	color?: Colors;
}) => {
	return (
		<label className={twMerge(' w-full', wrapperClasses)}>
			{label && <label className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white `}>{label}</label>}
			<input type='checkbox' className='sr-only peer' onChange={handleOnChange} checked={checked} />
			<div
				className={twMerge(
					`w-11 h-6 bg-gray-200 relative rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${toggleColorsClasses[color]} `,
					togglelasses
				)}
			></div>
		</label>
	);
};
