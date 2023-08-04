'use client';

import { ShoppingCart } from 'lucide-react';

import Currency from '@/components/ui/currency';

import { Product } from '@/types';
import useCart from '@/hooks/use-cart';
import { Button } from '../ui/button';

interface ProductInfoProps {
	data: Product;
}

const ProductInfo = ({ data }: ProductInfoProps) => {
	const cart = useCart();

	const onAddToCart = () => {
		cart.addItem(data);
	};

	return (
		<div>
			<h1 className='text-3xl font-bold'>{data?.name}</h1>
			<code className='mt-3 flex items-center gap-x-2' dangerouslySetInnerHTML={{ __html: data.description }} />
			<div className='mt-3 flex items-end justify-between'>
				<div className='text-2xl'>
					<Currency value={data?.price} />
				</div>
			</div>
			<hr className='my-4' />
			<div className='flex flex-col gap-y-6'>
				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold'>Size:</h3>
					<div>{data?.size?.value}</div>
				</div>
				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold'>Color:</h3>
					<div
						className='h-6 w-6 rounded-full border border-gray-600'
						style={{ backgroundColor: data?.color?.value }}
					/>
				</div>
				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold'>Stock:</h3>
					<div>{data?.stock[0]?.quantity}</div>
				</div>
			</div>
			<div className='mt-10 flex items-center gap-x-3'>
				<Button
					onClick={onAddToCart}
					className='flex items-center gap-x-2 
				bg-black border hover:border-2 
				border-white text-white hover:scale-105 hover:border-green-500 hover:bg-black'
				>
					Add To Cart
					<ShoppingCart size={20} />
				</Button>
			</div>
		</div>
	);
};

export default ProductInfo;
