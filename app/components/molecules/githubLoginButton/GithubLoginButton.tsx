'use client';
import { useEffect, useState } from 'react';
import { localizedT } from '../../../utils';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '../../../zustand/user';
import { Button } from '../../atoms/buttons/button';
import { Spinner } from '../../atoms/spinner';
import { be_service } from '../../../utils/Fixtures';
import { Colors } from '../../theme/colors';
import { GithubIcon } from '../../theme/icons/Github';

export const GithubLoginButton = ({ actualLocale }: { actualLocale: string }) => {
	const t = localizedT(actualLocale);
	const [loaging, setLoading] = useState(false);
	const searchParams = useSearchParams();
	const githubCode = searchParams?.get('code');
	const githubInitToken = searchParams?.get('githubToken');

	const { getUser } = useUserStore(state => ({
		getUser: state.getUser,
	}));

	useEffect(() => {
		(async () => {
			if (githubCode) {
				setLoading(true);
				if (window) window.open(`${be_service}/users/auth/github/${githubCode}`, '_self');
				setLoading(false);
			}
		})();
	}, [githubCode, getUser]);

	useEffect(() => {
		(async () => {
			if (githubInitToken) {
				setLoading(true);
				await fetch(`${be_service}/users/auth/validate/${githubInitToken}`);
				await getUser();
				setLoading(false);
			}
		})();
	}, [githubInitToken, getUser]);

	if (loaging)
		return (
			<Button color={Colors.SLATE} buttonClasses=' flex w-full justify-center gap-2'>
				<Spinner />
			</Button>
		);

	return (
		<Button
			color={Colors.SLATE}
			buttonClasses=' flex w-full justify-center gap-2'
			href={`https://github.com/login/oauth/authorize?client_id=a831b521461a003d1522&scope=read:user,user:email`}
		>
			<GithubIcon size={4} /> {t('layout.GithubLoginButton.label')}
		</Button>
	);
};
