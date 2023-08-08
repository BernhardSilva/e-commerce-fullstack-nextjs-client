'use client';

import { Tab } from '@headlessui/react';
import NextImage from 'next/image';

import { useHydration } from '@/hooks/use-hydration';
import { Image } from '@/types';
import GalleryTab from './gallery-tab';

interface GalleryProps {
	images: Image[];
}

const Gallery = ({ images }: GalleryProps) => {
	const isMounted = useHydration();

	if (!isMounted) return null;
	
	return (
		// Small images selectors
		<Tab.Group as='div' className='flex flex-col-reverse'>
			<div className='mx-auto w-full max-w-2xl sm:block lg:max-w-none'>
				<Tab.List className='grid grid-cols-4 gap-6'>
					{images?.map((image) => (
						<GalleryTab key={image.url} image={image} />
					))}
				</Tab.List>
			</div>
			{/* Principal gallery image */}
			<Tab.Panels className='mb-5 w-full'>
				{images?.map((image) => (
					<Tab.Panel key={image.url}>
						<div className='aspect-[4/3] relative h-50 w-full sm:rounded-lg overflow-hidden'>
							<NextImage fill src={image.url} alt='Image' className='object-cover object-center' />
						</div>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};

export default Gallery;
