import { useEffect, useRef, useState } from 'react';
import Image from '@/utils/image';
import { Button } from '../../atoms/buttons/button';
import { ImageSkeleton } from '../../atoms/imageSkeleton';
import { ExistingOrNotImage } from './ImageUpload';
import { tshirtSizes } from '../../theme/tshirtSizes';
import { Colors } from '../../theme/colors';
import { TrashCanIcon } from '../../theme/icons/TrashCan';

export const ImageList = ({
	setFiles,
	files,
	loadingFiles = 0,
	orderMode,
}: {
	files: ExistingOrNotImage[];
	setFiles: (newFiles: ExistingOrNotImage[]) => void;
	loadingFiles?: number;
	orderMode: boolean;
}) => {
	const bottomRef = useRef<HTMLDivElement>(null);
	const contentSectionRef = useRef<HTMLDivElement>(null);
	const [isBottomVisible, setIsBottomVisible] = useState(false);
	const [newOrder, setNewOrder] = useState<string[]>([]);

	const deleteImage = (index: number) => {
		setFiles([...files.slice(0, index), ...files.slice(index + 1, files.length)]);
	};

	const addItemToNewOrder = (imageFile: ExistingOrNotImage) => {
		const newKey = imageFile instanceof File ? `${imageFile.name}±${imageFile.size}` : imageFile.url;
		let newOrderList: string[] = [];
		if (newOrder.includes(newKey)) newOrderList = [...newOrder.filter(key => key !== newKey)];
		else newOrderList = [...newOrder, newKey];

		if (files.length === newOrderList.length) {
			const newFilesOrder: ExistingOrNotImage[] = [];
			newOrderList.forEach(key => {
				const name = key.split('±')[0];
				const size = Number(key.split('±')[1]);
				const file = files.find(file => {
					if (file instanceof File) return file.name === name && file.size === size;
					else return key === file.url;
				});
				if (file) newFilesOrder.push(file);
			});
			setFiles(newFilesOrder);
			setNewOrder([]);
		} else setNewOrder(newOrderList);
	};

	useEffect(() => {
		const options = {
			rootMargin: '0px',
			threshold: 0,
		};

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setIsBottomVisible(true);
				} else {
					setIsBottomVisible(false);
				}
			});
		}, options);

		if (bottomRef.current) observer.observe(bottomRef.current);

		return () => {
			observer.disconnect();
		};
	}, [isBottomVisible]);

	useEffect(() => {
		if (orderMode) {
			setNewOrder([]);
		}
	}, [orderMode]);

	const loadingSkeletons: number[] = [];

	if (loadingFiles)
		for (let index = 0; index < loadingFiles; index++) {
			loadingSkeletons.push(index);
		}

	return (
		<div
			className={` flex-none max-h-36 mb-3 overflow-scroll rounded-lg pt-2 ${
				files.length && (contentSectionRef.current?.offsetHeight ?? 0) > 160
					? !isBottomVisible
						? ' shadow-[0px_-100px_21px_-77px_rgba(0,0,0,0.45)_inset]  '
						: ' shadow-[0px_100px_21px_-77px_rgba(0,0,0,0.45)_inset] '
					: ''
			} `}
		>
			<div ref={contentSectionRef} className=' flex w-full flex-wrap gap-1 min-h-0 justify-center '>
				{loadingFiles ? (
					<>
						{loadingSkeletons.map((_itm, index) => (
							<div key={index} className=' w-[145px] h-20 relative'>
								<div className='relative block w-full h-full rounded-md bg-neutral-200 dark:bg-neutral-700 p-3'>
									<ImageSkeleton imageClasses='object-cover ' />
								</div>
							</div>
						))}
					</>
				) : (
					<>
						{files.map((imageFile, index) => {
							const newOrderIndex = orderMode
								? newOrder.findIndex(
										itm => itm === (imageFile instanceof File ? `${imageFile.name}±${imageFile.size}` : imageFile.url)
								  ) + 1
								: -1;
							return (
								<div
									key={imageFile instanceof File ? imageFile.name + imageFile.size : imageFile.url}
									className=' w-[145px] h-20 relative'
								>
									<div className='relative block w-full h-full rounded-md ' draggable={window.innerWidth > 1200}>
										<Image
											src={imageFile instanceof File ? URL.createObjectURL(imageFile) : imageFile.url}
											alt={imageFile instanceof File ? (imageFile as File).name : imageFile.url}
											fill
											className='object-cover w-3/6 h-32 '
											onClick={orderMode ? () => addItemToNewOrder(imageFile) : undefined}
										/>
										{orderMode ? (
											<>
												{newOrderIndex > 0 && (
													<div className='absolute z-10 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2'>
														{newOrderIndex}
													</div>
												)}
											</>
										) : (
											<Button
												onClick={() => deleteImage(index)}
												size={tshirtSizes.EXTRA_SMALL}
												color={Colors.RED}
												buttonClasses=' absolute -top-1 -right-2 z-10'
											>
												<TrashCanIcon />
											</Button>
										)}
									</div>
								</div>
							);
						})}
					</>
				)}
				<div className=' w-full h-1 ' ref={bottomRef}></div>
			</div>
		</div>
	);
};
