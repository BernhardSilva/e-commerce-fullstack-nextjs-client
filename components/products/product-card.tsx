'use client';

import Currency from '@/components//ui/currency';
import useCart from '@/hooks/use-cart';
import usePreviewModal from '@/hooks/use-preview-modal';
import { Product } from '@/types';
import { Expand, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import IconButton from '../ui/icon-button';

interface ProductCardProps {
	item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
	const router = useRouter();
	const cart = useCart();

	const previewModal = usePreviewModal();

	const handleClick = () => {
		router.push(`/product/${item?.id}`);
	};

	const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		previewModal.onOpen(item);
	};

	const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		cart.addItem(item);
	};
	return (
		<div onClick={handleClick} className='group cursor-pointer rounded-xl border p-3 space-y-4 dark:border-slate-800'>
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
						<IconButton onClick={onPreview} icon={<Expand size={20} className='text-gray-600 dark:text-black' />} />
						<IconButton
							onClick={onAddToCart}
							icon={<ShoppingCart size={20} className='text-gray-600 dark:text-black' />}
						/>
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
