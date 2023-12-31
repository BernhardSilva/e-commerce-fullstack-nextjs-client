import { X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useMenuRoute } from '@/hooks/use-menu-route';

interface CartItemProps {
	data: Product;
}

const CartItem = ({ data }: CartItemProps) => {
	const removeItem = useCart((state) => state.removeItem);
	const quantityItem = useCart((state) => state.quantityItem(data.id));
	const totalPriceItem = useCart((state) => state.totalPricePerItem(data.id));
	const addOrSubstractItem = useCart((state) => state.addOrSubstractItem);
	const menuRoute = useMenuRoute();

	const stockQuantity = data.stock[0]?.quantity;

	const stockMaxQuantity = (stockQuantity ?? 0) > 0 && (stockQuantity ?? 0) < 20 ? stockQuantity : 20;

	const onRemove = () => {
		removeItem(data.id);
	};

	const handleImageClick = () => {
		menuRoute('product', data.id);
	};

	return (
		<li
			className='flex py-2 px-2 border-b p-2 rounded-xl mb-2
			bg-slate-100 dark:bg-slate-900'
		>
			<div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
				<Image
					onClick={handleImageClick}
					fill
					src={data.images[0].url}
					alt=''
					className='object-cover object-center cursor-pointer'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority
				/>
			</div>
			<div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
				<div className='absolute z-10 right-0 top-0'>
					<IconButton className='hover:border-red-500' onClick={onRemove} icon={<X size={15} color='red' />} />
				</div>
				<div>
					<span className='text-sm font-thin'>
						{stockQuantity === 0 ? (
							'Out of stock'
						) : (
							<>
								<b className='mr-1'>Stock:</b>
								{stockQuantity}
							</>
						)}
					</span>
				</div>
				<div className='inline-flex mt-2'>
					<Currency value={data.price} />
					<span className='ml-2'>u</span>
				</div>
				<hr className='w-[50%]' />
				<div className='inline-flex'>
					<Currency value={totalPriceItem} />
					<span className={cn(`ml-2 font-light`, quantityItem > 1 && 'text-green-500 font-bold')}>
						{quantityItem}
						<span className='ml-1 font-light'>u</span>
					</span>
				</div>
				<hr />

				<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
					<div className='flex justify-between'>
						<p className='text-lg font-semibold'>{data?.name}</p>
					</div>

					<div className='mt-1 flex text-sm'>
						<div className='text-gray-500 dark:text-gray-300'>
							{data?.color?.name}
							<div
								className='w-[20px] h-[20px] md:w-[40px] md:h-[40px]
								md:mt-2 border border-slate-300 border-solid rounded-[100%]'
								style={{ backgroundColor: data?.color?.value }}
							/>
						</div>

						<div
							className='ml-4 border-l border-slate-200 dark:border-slate-800 pl-4
						 text-gray-500 dark:text-gray-300'
						>
							{data?.size?.name}
						</div>
						<div className='absolute right-0 bottom-0'>
							<Button
								size='sm'
								className='ml-2 h-8 w-8 rounded-[100%] 
								 bg-black  dark:border dark:border-white text-white 
								 hover:bg-black hover:border-2 hover:border-green-500 dark:hover:border-green-500 hover:scale-110'
								disabled={quantityItem < 1 || quantityItem === stockMaxQuantity}
								onClick={() => addOrSubstractItem(data.id, 1)}
							>
								+
							</Button>

							<Button
								disabled={quantityItem <= 1}
								size='sm'
								className='ml-2 h-8 w-8 rounded-[100%] 
								 bg-black dark:border hover:border-2 dark:border-white text-white 
								 hover:bg-black hover:border-red-500 dark:hover:border-red-500 hover:scale-110'
								onClick={() => addOrSubstractItem(data.id, -1)}
							>
								-
							</Button>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
