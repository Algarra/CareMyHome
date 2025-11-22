'use client';
import {
	DetailedHTMLProps,
	FC,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { inputColorsClasses, inputErrorClasses, labelInputColorsClasses } from './utils';
import { twMerge } from 'tailwind-merge';
import { Colors } from '../../theme/colors';
import { prefixByName } from './fixtures';
import { EdgeDownIcon } from '../../theme/icons/EdgeDown';
import { EdgeUpIcon } from '../../theme/icons/EdgeUp';

type OwnProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	label?: string;
	type?: HTMLInputTypeAttribute;
	color?: Colors;
	hasError?: boolean;
	focusControl?: boolean;
	wrapperClasses?: React.ComponentProps<'div'>['className'];
	inputClasses?: React.ComponentProps<'input'>['className'];
	handleOnChange: (e: EventTarget & HTMLInputElement & { prefix: string }) => void;
	inputRef?: RefObject<HTMLInputElement>;
};

export const PhoneInput: FC<OwnProps> = ({
	label,
	wrapperClasses,
	inputClasses,
	focusControl,
	color = Colors.AMBER,
	hasError,
	handleOnChange,
	inputRef,
	...restOfProps
}) => {
	const currentPhoneInput = useRef<HTMLDivElement>(null);
	const internInputRef = useRef<HTMLInputElement>(null);
	const buttonClicked = useRef(false);
	const [focus, setFocus] = useState(!!focusControl);
	const [open, setOpen] = useState(false);
	const [prefixSelected, setPrefixSelected] = useState(98);
	const handleCloseMenu = () => {
		if (!buttonClicked.current) setOpen(false);
		buttonClicked.current = false;
	};
	useEffect(() => {
		if (typeof focusControl !== 'undefined') setFocus(focusControl);
	}, [focusControl]);

	useEffect(() => {
		document.addEventListener('click', handleCloseMenu);
		return () => document.removeEventListener('click', handleCloseMenu);
	}, []);

	return (
		<div
			onBlur={() => {
				if (typeof focusControl === 'undefined') setFocus(false);
			}}
			onFocus={() => {
				if (typeof focusControl === 'undefined') setFocus(true);
			}}
			className={twMerge(' w-full relative ', wrapperClasses)}
			ref={currentPhoneInput}
		>
			{label && (
				<label
					onClick={() => {
						inputRef?.current?.focus();
						internInputRef.current?.focus();
					}}
					className={`block mb-2 cursor-text text-sm font-medium transition-all duration-200
          ${
						focus
							? labelInputColorsClasses[hasError ? Colors.RED : color]
							: hasError
							? labelInputColorsClasses[Colors.RED]
							: 'text-neutral-900 dark:text-white'
					}
           `}
				>
					{label}
					{restOfProps.required && '*'}
				</label>
			)}
			{restOfProps.maxLength && (
				<span
					className={`
        ${
					focus
						? labelInputColorsClasses[hasError ? Colors.RED : color]
						: hasError
						? labelInputColorsClasses[Colors.RED]
						: 'text-neutral-900 dark:text-white/50 '
				}
        absolute top-2 text-xs right-2 `}
				>
					{(restOfProps?.value as string).length} / {restOfProps.maxLength}
				</span>
			)}

			<div className='flex items-center relative'>
				<button
					id='dropdown-phone-button'
					className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-900 bg-neutral-100 border border-neutral-300 rounded-s-lg hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white dark:border-neutral-600'
					type='button'
					onClick={() => {
						buttonClicked.current = true;
						setOpen(prev => !prev);
					}}
				>
					{prefixByName[prefixSelected].prefix}{' '}
					<span className='ml-2'>{open ? <EdgeUpIcon size={2} /> : <EdgeDownIcon size={2} />}</span>
				</button>
				<div
					className={` absolute z-10 top-[100%] ${
						open ? '' : 'hidden'
					} bg-white divide-y divide-neutral-100 rounded-lg shadow dark:bg-neutral-700`}
				>
					<ul
						className='py-2 text-sm text-neutral-700 dark:text-neutral-200 overflow-auto max-h-60'
						aria-labelledby='dropdown-phone-button'
					>
						{prefixByName.map((pref, index) => (
							<li
								key={pref.country + pref.prefix}
								onClick={() => {
									setPrefixSelected(index);
									handleOnChange({
										...currentPhoneInput?.current?.querySelector('input'),
										prefix: prefixByName[index].prefix,
									} as any);
								}}
							>
								<button
									type='button'
									className='inline-flex w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-white'
									role='menuitem'
								>
									<span className='inline-flex items-center'>
										{pref.country} ({pref.prefix})
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className='relative w-full'>
					<input
						type='text'
						ref={inputRef}
						id='phone-input'
						onChange={e => {
							handleOnChange({
								...e.target,
								prefix: prefixByName[prefixSelected].prefix,
							});
						}}
						onBlur={() => {
							if (typeof focusControl === 'undefined') setFocus(false);
						}}
						{...restOfProps}
						className={twMerge(
							`${
								hasError
									? inputErrorClasses
									: 'bg-neutral-50 border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-white '
							} 
                ${inputColorsClasses[hasError ? Colors.RED : color]}
                block p-2.5 w-full z-20 text-sm rounded-e-lg border-s-0 border dark:bg-neutral-700 disabled:opacity-60 outline-none ring-0 m-0 dark:shadow-sm-light
              `,
							inputClasses
						)}
						placeholder='123456789'
						required
					/>
				</div>
			</div>

			{/* <input
        type={type}
        ref={inputRef}
        onChange={handleOnChange}
        onBlur={() => {
          if (typeof focusControl === "undefined") setFocus(false);
        }}
        className={twMerge(
          `${
            hasError
              ? inputErrorClasses
              : "bg-neutral-50 border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-white "
          } 
            ${inputColorsClasses[hasError ? Colors.RED : color]}
            shadow-sm transition-all remove-arrow duration-200 text-base disabled:opacity-60 outline-none border rounded-lg ring-0 dark:bg-neutral-700 block w-full p-2 m-0 dark:shadow-sm-light
          `,
          inputClasses
        )}
        {...restOfProps}
      /> */}
		</div>
	);
};
