import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ImageProps {
	id: string;
	label: string;
	imageUrl: string;
}

interface Props {
	images: ImageProps[];
	autoPlay?: boolean;
	showButtons?: boolean;
	time?: number;
}

export const Carousel = (props: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState<ImageProps>(props.images[0]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (props.autoPlay || !props.showButtons) {
			const interval = setInterval(
				() => {
					selectNewImage(selectedIndex, props.images);
				},
				!props.time ? 5000 : props.time
			);
			return () => clearInterval(interval);
		}
	});

	const selectNewImage = (index: number, images: ImageProps[], next = true) => {
		setLoaded(false);
		setTimeout(() => {
			const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
			const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
			setSelectedImage(images[nextIndex]);
			setSelectedIndex(nextIndex);
		}, 500);
	};

	const previous = () => {
		selectNewImage(selectedIndex, props.images, false);
	};

	const next = () => {
		selectNewImage(selectedIndex, props.images);
	};

	return (
		<>
			<div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden' key={selectedImage.id}>
				<div
					style={{ backgroundImage: `url(${selectedImage.imageUrl})`, filter: 'brightness(70%)' }}
					className={`rounded-xl relative aspect-square  md:aspect-[2.4/1] overflow-hidden bg-cover ransition duration-1000 ${
						loaded ? 'opacity-100' : ''
					}`}
				>
					<div className='h-full w-full flex flex-col justify-center text-center gap-y-8'>
						<div className='flex justify-around mt-5'>
							<div className='border border-black bg-slate-50 bg-opacity-30 rounded-xl p-2 font-bold sm:text-xl md:text-4xl lg:text-6xl sm:max-w-xl max-w-xs '>
								{selectedImage.label}
							</div>
						</div>
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
			</div>
		</>
	);
};
