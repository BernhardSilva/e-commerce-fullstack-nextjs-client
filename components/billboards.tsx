'use client';

import { Carousel } from '@/components/ui/carousel';
import { Billboard as BillboardType } from '@/types';

interface BillboardProps {
	data: BillboardType[];
}

export const Billboards = ({ data }: BillboardProps) => {

	const images = data?.map((billboard) => ({
		id: billboard?.id,
		imageUrl: billboard?.imageUrl,
		label: billboard?.label
	}));

	return <Carousel images={images} autoPlay={data?.length > 1} showButtons={data?.length > 1} time={10000} />;
};
