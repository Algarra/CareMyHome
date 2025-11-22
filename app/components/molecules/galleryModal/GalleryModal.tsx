import { ImageSlider } from '../../molecules/imageSlider';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CrossIcon } from '../../theme/icons/Cross';

export const GalleryModal: FC<{
	images: {
		src: string;
		alt: string;
		blurDataURL: string;
		width: number;
		height: number;
		title?: string;
	}[];
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	focerSliderPosition: number;
}> = ({ images, setOpen, focerSliderPosition, open }) => {
	const [forcePosition, setForcePosition] = useState(focerSliderPosition);
	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [open]);

	useEffect(() => {
		document.onkeydown = e => {
			if (e.keyCode === 39) {
				setForcePosition(forcePosition === images.length - 1 ? 0 : forcePosition + 1);
			}
			if (e.keyCode === 37) {
				setForcePosition(!forcePosition ? images.length - 1 : forcePosition - 1);
			}
		};
	}, [forcePosition, images.length]);
	return (
		<div className=' fixed flex z-40 h-full w-screen top-0 left-0 px-2 bg-black bg-opacity-50 p-2 lg:p-10 '>
			<div className='relative w-full h-full max-h-[600px] max-w-[900px] rounded-xl overflow-hidden m-auto '>
				<span
					className=' z-20 absolute rounded-full  bg-neutral-400/90 dark:bg-neutral-500/90 hover:bg-neutral-500/50 cursor-pointer right-3 top-3 p-2 '
					onClick={() => setOpen(false)}
				>
					<CrossIcon size={3} />
				</span>
				<ImageSlider imagePriority forcePosition={forcePosition} imageList={images} />
			</div>
		</div>
	);
};
