'use client';

import { Billboard as BillboardType } from '@/types';
import { Carousel } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

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
