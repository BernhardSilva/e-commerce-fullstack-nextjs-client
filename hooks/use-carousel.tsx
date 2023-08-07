import * as React from 'react';

export interface CarouselProps {
	images: ImageCarouselProps[];
	autoPlay?: boolean;
	showButtons?: boolean;
	time?: number; //ms
	maxImages?: number;
}

export interface ImageCarouselProps {
	id: string | number;
	label?: string;
	imageUrl: string;
}

export const useCarousel = ({ autoPlay, showButtons, time, images, maxImages }: CarouselProps) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [currentImage, setCurrentImage] = React.useState<ImageCarouselProps>(images[0]);
	const [loaded, setLoaded] = React.useState(true);

	React.useEffect(() => {
		if (autoPlay || !showButtons) {
			const interval = setInterval(
				() => {
					selectNewImage(currentIndex, images);
				},
				!time ? 5000 : time
			);
			return () => clearInterval(interval);
		}
	});

	const selectNewImage = (index: number, images: ImageCarouselProps[], next = true) => {
		setLoaded(false);
		const imagesLength = maxImages ? images.slice(0, maxImages).length - 1 : images.length - 1;
		setTimeout(() => {
			const condition = next ? index < imagesLength : index > 0;
			const nextIndex = next ? (condition ? index + 1 : 0) : condition ? index - 1 : imagesLength;
			setCurrentImage(images[nextIndex]);
			setCurrentIndex(nextIndex);
			setLoaded(true);
		}, 1000);
	};

	const selectedButtonClick = (index: number, currentImage: ImageCarouselProps) => {
		if (currentIndex !== index) {
			setLoaded(false);
			setTimeout(() => {
				setCurrentIndex(index);
				setCurrentImage(currentImage);
				setLoaded(true);
			}, 1000);
		}
	};

	const previous = () => {
		selectNewImage(currentIndex, images, false);
	};

	const next = () => {
		selectNewImage(currentIndex, images);
	};

	return {
		currentImage,
		currentIndex,
		loaded,
		previous,
		next,
		selectedButtonClick
	};
};
