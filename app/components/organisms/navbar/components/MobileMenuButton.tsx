'use client';
import { useEffect, useRef } from 'react';
import { TextButton } from '../../../atoms/buttons/textButton';
import { useMenuStore } from '../../../../zustand/menu';
import { tshirtSizes } from '../../../theme/tshirtSizes';
import { MenuHamburgerIcon } from '../../../theme/icons/MenuHamburger';

export const MobileMenuButton = () => {
	const buttonClicked = useRef(false);
	const { menuOpen, setMenuOpen } = useMenuStore();
	const handleCloseMenu = () => {
		if (!buttonClicked.current) setMenuOpen(false);
		buttonClicked.current = false;
	};

	useEffect(() => {
		document.addEventListener('click', handleCloseMenu);
		return () => document.removeEventListener('click', handleCloseMenu);
	}, []);

	return (
		<TextButton
			onClick={() => {
				buttonClicked.current = true;
				setMenuOpen(!menuOpen);
			}}
			size={tshirtSizes.SMALL}
			buttonClasses=' sm:px-5 sm:py-2.5 lg:hidden '
		>
			<span className='sr-only'>Open main menu</span>
			<MenuHamburgerIcon size={4} />
		</TextButton>
	);
};
