import { FC, ReactNode } from 'react';
import { Colors } from '../../../theme/colors';
import { outlinedButtonFromColorsClasses, outlinedButtonToColorsClasses } from './utils/outlinedButtonColors';
import { OutlinedButtonSizes } from './utils';
import { OptionalButtonLink } from '../../utils';
import { twMerge } from 'tailwind-merge';
import { tshirtSizes } from '../../../theme/tshirtSizes';

type OwnProps = {
	color?: Colors;
	fromColor?: Colors;
	toColor?: Colors;
	size?: tshirtSizes;
	children: ReactNode;
	href?: string;
	disabled?: boolean;
	blank?: boolean;
	buttonClasses?: React.ComponentProps<'button'>['className'];
	innerSpanClasses?: React.ComponentProps<'span'>['className'];
};

export const OutlinedButton: FC<OwnProps & React.HTMLAttributes<HTMLButtonElement>> = ({
	color,
	fromColor = Colors.GREEN,
	toColor = Colors.BLUE,
	size = tshirtSizes.BASE,
	children,
	buttonClasses,
	innerSpanClasses,
	href,
	disabled,
	blank = false,
	...RestOfProps
}) => {
	return (
		<OptionalButtonLink blank={blank} href={href}>
			<button
				disabled={disabled}
				className={twMerge(
					`relative inline-flex transition-all duration-200 cursor-pointer items-center justify-center p-0.5 overflow-hidden text-neutral-900 rounded-lg group bg-gradient-to-br
        ${outlinedButtonFromColorsClasses[disabled ? Colors.SLATE : color ?? fromColor]} 
        ${outlinedButtonToColorsClasses[disabled ? Colors.SLATE : color ?? toColor]} 
        hover:text-white dark:text-white disabled:text-neutral-500 ring-0 active:opacity-50 disabled:cursor-default `,
					buttonClasses
				)}
				{...RestOfProps}
			>
				<span
					className={twMerge(
						` ${
							OutlinedButtonSizes[size]
						} relative bg-opacity-80 transition-all ease-in duration-75 bg-white dark:bg-neutral-900 rounded-md 
          ${disabled ? '' : 'group-hover:bg-opacity-0'}
          `,
						innerSpanClasses
					)}
				>
					{children}
				</span>
			</button>
		</OptionalButtonLink>
	);
};
