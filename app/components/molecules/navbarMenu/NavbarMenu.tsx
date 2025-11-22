'use client';
import Link from 'next/link';
import { TextButton } from '../../atoms/buttons/textButton';
import { DropDownButton } from '../dropDownButton';
import { useMenuStore } from '../../../zustand/menu';
import { LanguageSelect } from '../languageSelect';
import { CurrencySelect } from '../currencySelect';

type SimpleLinkButton = { link: string; text: string };

type DropDownButtonData = {
	text: string;
	submenuLinks: { link: string; text: string }[];
};

export type MenuButton = SimpleLinkButton | DropDownButtonData;

export const NavbarMenu = ({
	highlighted,
	links,
	actualLocale,
}: {
	highlighted?: string;
	links: MenuButton[];
	actualLocale: string;
}) => {
	const menuOpen = useMenuStore(state => state.menuOpen);
	const setBlockOpen = useMenuStore(state => state.setBlockOpen);

	return (
		<nav className={`items-center justify-between ${menuOpen ? '' : 'hidden'} w-full lg:flex lg:w-auto ;g:order-1`}>
			<ul className='flex flex-col mt-4 font-medium lg:flex-row  lg:mt-0'>
				{links.map((item, index) => {
					if ('link' in item) {
						return (
							<li key={`${item.link}+${item.text}`}>
								<Link href={item.link} title={item.text} aria-current='page'>
									<TextButton highlighted={highlighted?.toLowerCase() === item.text.toLowerCase()}>
										{item.text}
									</TextButton>
								</Link>
							</li>
						);
					}
					if ('submenuLinks' in item) {
						return (
							<li key={`${item.text}+${index}`}>
								<DropDownButton text={item.text} links={item.submenuLinks} />
							</li>
						);
					}
					return null;
				})}
			</ul>
			<div onClick={() => setBlockOpen(true)} className=' flex justify-end lg:hidden gap-3 pr-3'>
				<CurrencySelect />
				<LanguageSelect actualLocale={actualLocale} dropdownSide='left' />
			</div>
		</nav>
	);
};
