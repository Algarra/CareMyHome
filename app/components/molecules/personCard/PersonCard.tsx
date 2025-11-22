import Image from '@/utils/image';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FC } from 'react';
import { FacebookIcon } from '../../theme/icons/Facebook';
import { Colors } from '../../theme/colors';
import { XIcon } from '../../theme/icons/X';
import { GithubIcon } from '../../theme/icons/Github';
import { LinkedInIcon } from '../../theme/icons/LinkedIn';

export type PersonCardProps = {
	name: string;
	title: string;
	description: string;
	image: string | StaticImport;
	facebookLink?: string;
	xLink?: string;
	githubLink?: string;
	linkedInLink?: string;
};

export const PersonCard: FC<PersonCardProps> = ({
	name,
	title,
	description,
	facebookLink,
	xLink,
	githubLink,
	linkedInLink,
	image,
}) => {
	return (
		<div className='items-center bg-neutral-50 rounded-lg shadow sm:flex dark:bg-neutral-800 dark:border-neutral-700'>
			<div className='h-72 relative w-full lg:w-80 '>
				<Image className='w-full object-cover rounded-lg sm:rounded-none sm:rounded-l-lg' alt={name} src={image} fill />
			</div>
			<div className='p-5'>
				<h3 className='text-xl font-bold tracking-tight text-neutral-900 dark:text-white'>{name}</h3>
				<span className='text-neutral-500 dark:text-neutral-400'>{title}</span>
				<p className='mt-3 mb-4 font-light text-neutral-500 dark:text-neutral-400'>{description}</p>
				<ul className='flex space-x-4 sm:mt-0'>
					{facebookLink && (
						<li>
							<Link
								href={facebookLink}
								className='text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
								aria-label='facebook'
							>
								<FacebookIcon color={Colors.SLATE} />
							</Link>
						</li>
					)}
					{xLink && (
						<li>
							<Link
								href={xLink}
								className='text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
								aria-label='twitter'
							>
								<XIcon />
							</Link>
						</li>
					)}
					{githubLink && (
						<li>
							<Link
								href={githubLink}
								className='text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
								aria-label='Github'
							>
								<GithubIcon size={4} />
							</Link>
						</li>
					)}
					{linkedInLink && (
						<li>
							<Link
								href={linkedInLink}
								className='text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
								aria-label='linkedin'
							>
								<LinkedInIcon />
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
