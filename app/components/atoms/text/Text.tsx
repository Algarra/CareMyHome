import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const Text = ({
	children,
	textClasses,
	...restOfPosts
}: {
	children: ReactNode;
	textClasses?: string;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
	<p {...restOfPosts} className={twMerge(` mb-3 text-gray-950 dark:text-gray-100 `, textClasses)}>
		{children}
	</p>
);
