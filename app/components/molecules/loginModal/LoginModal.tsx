'use client';
import { localizedT } from '../../../utils';
import { Modal } from '../../atoms/modal';
import { Title, titleSize } from '../../atoms/title';
// import { GoogleLoginButton } from '../googleLoginButton/GoogleLoginButton';
import { useLoginModalStore } from './zustand/loginModal';
import { Text } from '../../atoms/text';
// import { GithubLoginButton } from '../githubLoginButton';

export const LoginModal = ({ actualLocale }: { actualLocale: string }) => {
	const t = localizedT(actualLocale);
	const { loginModalOpen, setLoginModalOpen } = useLoginModalStore();

	return (
		<Modal
			open={loginModalOpen}
			setOpen={value => {
				setLoginModalOpen(value);
			}}
		>
			<div className=' text-center justify-center mb-7 '>
				<Title size={titleSize.H3}>{t('layout.loginModal.title')}</Title>
				<Text>{t('layout.loginModal.infoText')}</Text>
			</div>
			<div className='flex flex-col gap-2'>
				{/* <GoogleLoginButton actualLocale={actualLocale} />
        <GithubLoginButton actualLocale={actualLocale} /> */}
			</div>
		</Modal>
	);
};
