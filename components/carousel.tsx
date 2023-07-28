import { ArrowBigLeftIcon, ArrowBigRightIcon, CircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ImageProps {
	id: string | number;
	label?: string;
	imageUrl: string;
}

interface Props {
	images: ImageProps[];
	maxImages?: number;
	imageBrightness?: number;
	time?: number; //ms
	autoPlay?: boolean;
	showButtons?: boolean;
}

export const Carousel = (props: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentImage, setCurrentImage] = useState<ImageProps>(props.images[0]);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		if (props.autoPlay || !props.showButtons) {
			const interval = setInterval(
				() => {
					selectNewImage(currentIndex, props.images);
				},
				!props.time ? 5000 : props.time
			);
			return () => clearInterval(interval);
		}
	});

	const selectNewImage = (index: number, images: ImageProps[], next = true) => {
		setLoaded(false);
		const imagesLength = props.maxImages ? props.images.slice(0, props.maxImages).length - 1 : images.length - 1;
		setTimeout(() => {
			const condition = next ? index < imagesLength : index > 0;
			const nextIndex = next ? (condition ? index + 1 : 0) : condition ? index - 1 : imagesLength;
			setCurrentImage(images[nextIndex]);
			setCurrentIndex(nextIndex);
			setLoaded(true);
		}, 500);
	};

	const selectedButtonClick = (index: number, currentImage: ImageProps) => {
		if (currentIndex !== index) {
			setLoaded(false);
			setTimeout(() => {
				setCurrentIndex(index);
				setCurrentImage(currentImage);
				setLoaded(true);
			}, 500);
		}
	};

	const previous = () => {
		selectNewImage(currentIndex, props.images, false);
	};

	const next = () => {
		selectNewImage(currentIndex, props.images);
	};

	return (
		<>
			<div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden' key={currentImage.id}>
				<div
					style={{
						backgroundImage: `url(${currentImage.imageUrl})`,
						filter: `brightness(${!props.imageBrightness ? 70 : props.imageBrightness}%)`,
						opacity: loaded ? '1' : '0.8'
					}}
					className={`rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover`}
				>
					<div className='h-full w-full flex flex-col justify-center text-center gap-y-8'>
						{currentImage.label && (
							<div className='flex justify-around mt-5'>
								<div className='border border-black bg-slate-50 bg-opacity-30 rounded-xl p-2 font-bold sm:text-xl md:text-4xl lg:text-6xl sm:max-w-xl max-w-xs '>
									{currentImage.label}
								</div>
							</div>
						)}

						{props.showButtons && (
							<button
								className='absolute sm:p-2 md:p-4 lg:p-5 ml-1 mt-5 left-1 border border-black bg-slate-50 bg-opacity-30 rounded-full'
								onClick={previous}
							>
								<ArrowBigLeftIcon />
							</button>
						)}

						{props.showButtons && (
							<button
								className='absolute sm:p-2 md:p-4 lg:p-5 mr-1 right-1 mt-5 border border-black bg-slate-50 bg-opacity-30 rounded-full'
								onClick={next}
							>
								<ArrowBigRightIcon />
							</button>
						)}
					</div>
				</div>
				{props.showButtons && (
					<div className='h-full w-full flex flex-col justify-center items-center text-center gap-x-8'>
						<div className='flex justify-center mt-5'>
							{props.images.slice(0, props.maxImages).map((image, index) => (
								<button key={currentIndex} className='px-4 py-2 mx-2' onClick={() => selectedButtonClick(index, image)}>
									{index === currentIndex ? <CircleIcon /> : <CircleIcon color='#616161' />}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};
