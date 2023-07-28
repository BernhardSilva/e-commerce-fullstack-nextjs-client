'use client';

import { Product } from '@/types';
import { Expand, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import IconButton from '../ui/icon-button';
import Currency from '@/components//ui/currency';

interface ProductCardProps {
	item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
	return (
		<div className='group cursor-pointer rounded-xl border p-3 space-y-4 dark:border-zinc-800'>
			{/* Images and actions */}
			<div className='aspect-square rounded-xl bg-gray-100 relative'>
				<Image
					src={item?.images?.[0]?.url}
					alt={item?.images?.[0]?.url}
					fill
					className='aspect-square object-cover rounded-md'
				/>
				<div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
					<div className='flex gap-x-6 justify-center'>
						<IconButton onClick={() => {}} icon={<Expand size={20} className='text-gray-600' />} />
						<IconButton onClick={() => {}} icon={<ShoppingCart size={20} className='text-gray-600' />} />
					</div>
				</div>
			</div>
			{/* Desc */}
			<div>
				<p className='font-semibold text-lg'>{item.name}</p>
			</div>
			<div>
				<p className='text-sm text-gray-500'>{item.category.name}</p>
			</div>
			{/* Price */}
			<div>
				<div className='font-semibold text-xl'>
					<Currency value={item?.price} />
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
