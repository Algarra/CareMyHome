'use client';
import { FC } from 'react';
import { GlobeIcon } from '../../theme/icons/Globe';
import { localizedT } from '../../../utils';
import { Select } from '../../atoms/select';
import { useRouter } from 'next/navigation';
import { tshirtSizes } from '../../theme/tshirtSizes';

type LanguageSelectProps = {
	actualLocale: string;
	dropdownSide?: 'left' | 'right';
};

const languagesPath = {
	en: '/en',
	es: '/es',
	fr: '/fr',
	de: '/de',
	it: '/it',
};

export const LanguageSelect: FC<LanguageSelectProps> = ({ actualLocale, dropdownSide }) => {
	const t = localizedT(actualLocale);
	const router = useRouter();

	const cleanPath = (path: string) => {
		if (path.length > 4) {
			let newPath = path;
			Object.values(languagesPath).forEach(val => {
				if (val && newPath.startsWith(`${val}/`)) {
					const path2 = newPath.substring(3);
					newPath = path2;
				}
			});
			return newPath;
		}
		return '/';
	};

	const handleLangChange = (lang: any) => {
		const cleanActualPath = cleanPath(window.location.pathname);
		const newPath = languagesPath[lang as keyof typeof languagesPath] + cleanActualPath;
		// window.location.pathname = newPath;
		router.replace(newPath);
		router.refresh();
	};

	// useEffect(() => {
	//   const existingLang = window.localStorage.getItem(
	//     "userLang"
	//   ) as keyof typeof languagesPath;
	//   if (existingLang && existingLang !== t("actualLocale")) {
	//     handleLangChange(existingLang);
	//   }
	// }, []);

	return (
		<Select
			placeholder='Lang'
			handleOnChange={handleLangChange}
			options={[
				{ label: t('layout.navbar.languages.English'), key: 'en' },
				{ label: t('layout.navbar.languages.Spanish'), key: 'es' },
				{ label: t('layout.navbar.languages.French'), key: 'fr' },
				{ label: t('layout.navbar.languages.German'), key: 'de' },
				{ label: t('layout.navbar.languages.italian'), key: 'it' },
			]}
			value={t('actualLocale')}
			removeEdge
			button={{
				buttonClasses: ' px-1 py-1',
				size: tshirtSizes.EXTRA_SMALL,
				name: 'Language selector',
			}}
			dropdownSide={dropdownSide}
			textButton
		>
			<GlobeIcon />
			<span className='sr-only'>Language selector</span>
		</Select>
	);
};
