'use client';

import { Billboard as BillboardType } from '@/types';
import { Carousel } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

interface BillboardProps {
	data: BillboardType[];
}

export const Billboards = ({ data }: BillboardProps) => {
	const [isPlural, setIsPlural] = useState(false);

	useEffect(() => {
		data?.length > 1 ? setIsPlural(true) : setIsPlural(false);
	}, [data]);

	const images = data?.map((billboard) => ({
		id: billboard?.id,
		imageUrl: billboard?.imageUrl,
		label: billboard?.label
	}));

	return <Carousel images={images} autoPlay={isPlural} showButtons={isPlural} time={10000} />;
};
