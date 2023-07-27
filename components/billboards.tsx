'use client';

import { Billboard as BillboardType } from '@/types';
import { Carousel } from './carousel';

interface BillboardProps {
	data: BillboardType[];
}

export const Billboards = ({ data }: BillboardProps) => {
	const images = data.map((billboard) => ({
		id: billboard.id,
		imageUrl: billboard.imageUrl,
		label: billboard.label
	}));
	return <Carousel images={images} autoPlay={true} showButtons={true} time={5000}></Carousel>;
};
