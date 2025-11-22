import Link from 'next/link';
import { FC, ReactNode } from 'react';

type OptionalButtonLinkProps = {
	href?: string;
	children: ReactNode;
	blank?: boolean;
};
export const OptionalButtonLink: FC<OptionalButtonLinkProps> = ({ href, children, blank = false }) => {
	if (!href) return <>{children}</>;
	else
		return (
			<Link target={blank ? '_blank' : undefined} href={href}>
				{children}
			</Link>
		);
};
