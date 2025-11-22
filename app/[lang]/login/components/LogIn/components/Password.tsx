import { Input } from '@/app/components/atoms/input';
import { EyeIcon } from '@/app/components/theme/icons/Eye';
import { FC, useState } from 'react';

export const Password: FC<{ setPasswordValue: (value: string) => void; label: string; hasError: boolean }> = ({
	setPasswordValue,
	label,
	hasError,
}) => {
	const [password, setPassword] = useState('');
	const [visible, setVisible] = useState(false);

	return (
		<div className='relative mb-3' data-te-input-wrapper-init>
			<Input
				label={label}
				value={password}
				type={visible ? 'text' : 'password'}
				handleOnChange={e => {
					setPasswordValue(e.target.value);
					setPassword(e.target.value);
				}}
				hasError={hasError}
			/>
			<span
				onClick={() => setVisible(!visible)}
				className={` text-black dark:text-white absolute top-9 right-2 ${!visible && 'opacity-50'}`}
			>
				<EyeIcon />
			</span>
			{hasError && <span className='text-red-500 text-xs'>Email or passowrd may be wrong</span>}
		</div>
	);
};
