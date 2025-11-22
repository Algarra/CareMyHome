'use client';
import { ChangeEventHandler, DetailedHTMLProps, FC, RefObject, TextareaHTMLAttributes, useRef, useState } from 'react';
import { textAreaColorsClasses, inputErrorClasses, labelTextAreaColorsClasses } from './utils';
import { twMerge } from 'tailwind-merge';
import { Colors } from '../../theme/colors';

type OwnProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
	label?: string;
	color?: Colors;
	hasError?: boolean;
	wrapperClasses?: React.ComponentProps<'div'>['className'];
	textareaClasses?: React.ComponentProps<'textarea'>['className'];
	handleOnChange?: ChangeEventHandler<HTMLTextAreaElement>;
	handleOnBlur?: ChangeEventHandler<HTMLTextAreaElement>;
	textareaRef?: RefObject<HTMLTextAreaElement>;
};

export const TextArea: FC<OwnProps> = ({
	label,
	wrapperClasses,
	textareaClasses,
	color = Colors.BLUE,
	hasError,
	handleOnChange,
	handleOnBlur,
	textareaRef,
	...restOfProps
}) => {
	const internTextareaRef = useRef<HTMLTextAreaElement>(null);
	const [focus, setFocus] = useState(false);

	return (
		<div onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} className={wrapperClasses + ' w-full relative '}>
			{label && (
				<label
					onClick={() => {
						textareaRef?.current?.focus();
						internTextareaRef.current?.focus();
					}}
					className={`block mb-2 cursor-text text-sm font-medium 
          ${
						focus
							? labelTextAreaColorsClasses[hasError ? Colors.RED : color]
							: hasError
							? labelTextAreaColorsClasses[Colors.RED]
							: 'text-gray-900 dark:text-white'
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
						? labelTextAreaColorsClasses[hasError ? Colors.RED : color]
						: hasError
						? labelTextAreaColorsClasses[Colors.RED]
						: 'text-gray-900 dark:text-white/50 '
				}
        absolute top-2 text-xs right-2 `}
				>
					{(restOfProps?.value as string)?.length} / {restOfProps.maxLength}
				</span>
			)}
			<textarea
				ref={textareaRef ?? internTextareaRef}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				className={twMerge(
					`${
						hasError
							? inputErrorClasses
							: 'bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-600 dark:text-white '
					} 
        ${textAreaColorsClasses[hasError ? Colors.RED : color]}
        shadow-sm disabled:opacity-60 outline-none border text-base rounded-lg ring-0 dark:bg-gray-700 block w-full p-2.5 dark:shadow-sm-light`,
					textareaClasses
				)}
				{...restOfProps}
			/>
		</div>
	);
};
