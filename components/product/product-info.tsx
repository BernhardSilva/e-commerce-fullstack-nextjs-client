'use client';

import { ShoppingCart, Trash } from 'lucide-react';

import Currency from '@/components/ui/currency';

import useCart from '@/hooks/use-cart';
import { useHydration } from '@/hooks/use-hydration';
import { useMenuRoute } from '@/hooks/use-menu-route';
import usePreviewModal from '@/hooks/use-preview-modal';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { Button } from '../ui/button';
import IconButton from '../ui/icon-button';

interface ProductInfoProps {
	data: Product;
}

const ProductInfo = ({ data }: ProductInfoProps) => {
	const isMounted = useHydration();

	const addItem = useCart((state) => state.addItem);
	const removeItem = useCart((state) => state.removeItem);
	const quantity = useCart((state) => state.quantityItem(data.id));
	const totalPriceItem = useCart((state) => state.totalPricePerItem(data.id));
	const addOrSubstractItem = useCart((state) => state.addOrSubstractItem);

	const menuRoute = useMenuRoute();

	const { onClose } = usePreviewModal();

	const onAddToCart = () => {
		addItem(data);
	};

	const onRemove = () => {
		removeItem(data.id);
	};

	const handleCartClick = () => {
		if (quantity === 0) {
			onAddToCart();
		} else {
			menuRoute('cart');
			onClose();
		}
	};

	if (!isMounted) return null;

	return (
		<div>
			<h1 className='text-3xl font-bold'>{data?.name}</h1>

			<code
				className='mt-3 flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-2'
				dangerouslySetInnerHTML={{ __html: data.description }}
			/>
			<div className='mt-3 flex items-end justify-between text-lg md:text-2xl bg-slate-100 dark:bg-slate-900 rounded-lg p-2'>
				<div className=''>
					<Currency value={data?.price} />
				</div>
				<div className='inline-flex'>
					{(quantity || quantity !== 0) && (
						<>
							<span className='font-light mr-1 hidden sm:block'>Total:</span>
							<Currency value={totalPriceItem} />
							<div
								className={cn(`ml-2 mt-0.5 md:mt-1.5 font-light text-base`, quantity > 1 && 'text-green-500 font-bold')}
							>
								{quantity}
								<span className='ml-1'>u</span>
							</div>
						</>
					)}
				</div>
			</div>
			<div className='mt-3 flex flex-col gap-y-4 bg-slate-100 dark:bg-slate-900 rounded-lg p-2'>
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
					onClick={handleCartClick}
					className='flex items-center gap-x-2 
				bg-black border hover:border-2 
				border-white text-white hover:scale-105 hover:border-green-500 hover:bg-black'
				>
					{`${quantity < 1 ? 'Add to' : 'Checkout'} `}
					<ShoppingCart size={20} />
				</Button>
				<div>
					<Button
						size='sm'
						className='ml-2 h-8 w-8 rounded-[100%] 
								 bg-black  dark:border dark:border-white text-white 
								 hover:bg-black hover:border-2 hover:border-green-500 dark:hover:border-green-500 hover:scale-110'
						disabled={quantity < 1 || quantity === 20}
						onClick={() => addOrSubstractItem(data.id, 1)}
					>
						+
					</Button>

					<Button
						disabled={quantity <= 1}
						size='sm'
						className='ml-2 h-8 w-8 rounded-[100%] 
								 bg-black dark:border hover:border-2 dark:border-white text-white 
								 hover:bg-black hover:border-red-500 dark:hover:border-red-500 
								 hover:scale-110'
						onClick={() => addOrSubstractItem(data.id, -1)}
					>
						-
					</Button>
				</div>
				<IconButton
					disabled={quantity === 0}
					className='cursor-pointer disabled:opacity-50 hover:border-red-500 disabled:hover:border-white'
					onClick={onRemove}
					icon={<Trash size={15} color='red' />}
				/>
			</div>
		</div>
	);
};

export default ProductInfo;
