'use client';
import { TextButton } from '../../../atoms/buttons/textButton';
import { CartIcon } from '../../../theme/icons/Cart';
import { tshirtSizes } from '../../../theme/tshirtSizes';
import { useCartStore } from '../../../../zustand/cart';

export const CartButton = () => {
	const cardItemsLength = useCartStore(state =>
		state.items.reduce((accumulator, currentItem) => accumulator + (currentItem.units ?? 1), 0)
	);

	const cartOpen = useCartStore(state => state.open);

	const hasTwoDigits = cardItemsLength > 9;
	const hasThreeDigits = cardItemsLength > 99;

	return (
		<div className=' relative'>
			<TextButton
				size={tshirtSizes.EXTRA_SMALL}
				id='test'
				onClick={() => {
					const cartButton = new CustomEvent('cartButtonClick');
					if (!cartOpen) window.dispatchEvent(cartButton);
				}}
				buttonClasses=' dark:text-white'
			>
				<CartIcon />
				<span className='sr-only'>Open cart</span>
			</TextButton>
			{!!cardItemsLength && (
				<div className=' absolute -top-2 right-1 '>
					<div className=' p-2.5 bg-red-600 rounded-full '>
						<span
							className={` absolute text-white text-[10px] z-10 top-[3px] ${
								!hasTwoDigits ? 'right-[7px]' : hasThreeDigits ? 'right-[1px]' : 'right-[4px]'
							} `}
						>
							{hasThreeDigits ? '+99' : cardItemsLength}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};
