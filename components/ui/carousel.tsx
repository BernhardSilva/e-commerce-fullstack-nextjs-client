import { CircleIcon } from 'lucide-react';
import { CarouselProps, useCarousel } from '../../hooks/use-carousel';

export const Carousel = ({ images, maxImages, time, autoPlay, showButtons }: CarouselProps) => {
	const { currentImage, currentIndex, loaded, next, previous, selectedButtonClick } = useCarousel({
		images,
		autoPlay,
		showButtons,
		time,
		maxImages
	});

	return (
		<>
			<div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden' key={currentImage?.id}>
				<div
					style={{
						backgroundImage: `url(${currentImage?.imageUrl})`
					}}
					className={`rounded-xl relative aspect-square sm:aspect-[2.6/2]
						md:aspect-[6.4/2] lg:aspect-[6.8/2] overflow-hidden bg-cover
						brightness-70 dark:brightness-110 transition-all duration-1000 ease-in
						${!loaded && autoPlay ? 'opacity-0' : 'opacity-100'}`}
				>
					<div className='h-full w-full grid place-items-center text-center'>
						{currentImage?.label && (
							<div
								className='p-2 border border-black bg-slate-50 bg-opacity-30
									dark:border-white dark:bg-slate-950 dark:bg-opacity-50
									rounded-xl font-bold sm:text-xl md:text-4xl lg:text-6xl sm:max-w-xl max-w-xs '
							>
								{currentImage?.label}
							</div>
						)}

						{showButtons && (
							<button
								className='absolute h-full left-0 w-10 lg:w-16
								bg-slate-800 bg-opacity-30 hover:backdrop-brightness-125
								dark:border-white dark:bg-opacity-50 dark:bg-slate-900'
								onClick={previous}
							></button>
						)}

						{showButtons && (
							<button
								className='absolute h-full right-0 w-10 lg:w-16
								bg-slate-800 bg-opacity-30 hover:backdrop-brightness-125
								dark:border-white dark:bg-opacity-50 dark:bg-slate-900'
								onClick={next}
							></button>
						)}
					</div>
				</div>

				{showButtons && (
					<div className='h-full w-full flex flex-col justify-center items-center text-center gap-x-8'>
						<div className='flex justify-center mt-5'>
							{images.slice(0, maxImages).map((image, index) => (
								<button key={image.id} className='px-4 py-2 mx-2' onClick={() => selectedButtonClick(index, image)}>
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
