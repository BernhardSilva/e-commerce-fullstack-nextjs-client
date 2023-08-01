import { MinusIcon, PlusIcon, X } from 'lucide-react';
import Image from 'next/image';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';

interface CartItemProps {
	data: Product;
}

const CartItem = ({ data }: CartItemProps) => {
	const cart = useCart();

	const onRemove = () => {
		cart.removeItem(data.id);
	};

	return (
		<li
			className='flex py-2 px-2 border-b p-2 rounded-xl mb-2
			bg-slate-100 dark:bg-slate-900'
		>
			<div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
				<Image fill src={data.images[0].url} alt='' className='object-cover object-center' />
			</div>
			<div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
				<div className='absolute z-10 right-0 top-0'>
					<IconButton onClick={onRemove} icon={<X size={15} />} />
				</div>
				<div className='inline-flex mt-2'>
					<Currency value={data.price} />
					<span className='ml-2'>u</span>
				</div>
				<div className='inline-flex'>
					<Currency value={cart.totalPricePerItem(data.id)} />
					<span className='ml-2'>
						{cart.quantityItem(data.id)}
						<span className='ml-1'>u</span>
					</span>
				</div>
				<hr />

				<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
					<div className='flex justify-between'>
						<p className='text-lg font-semibold'>{data.name}</p>
					</div>

					<div className='mt-1 flex text-sm'>
						<div className='text-gray-500 dark:text-gray-300'>
							{data.color.name}
							<div
								className='w-[20px] h-[20px] md:w-[40px] md:h-[40px]
								md:mt-2 border border-slate-300 border-solid rounded-[100%]'
								style={{ backgroundColor: data.color.value }}
							/>
						</div>

						<div
							className='ml-4 border-l border-slate-200 dark:border-slate-800 pl-4
						 text-gray-500 dark:text-gray-300'
						>
							{data.size.name}
						</div>
						<div className='flex place-items-center justify-center ml-[15%]'>
							<Button
								variant='default'
								size='sm'
								className='ml-2 h-8 w-8 rounded-[100%] hover:scale-110'
								disabled={cart.quantityItem(data.id) === 20}
								onClick={() => cart.addOrSubstractItem(data.id, 1)}
							>
								<PlusIcon className='h-5 w-5' />
							</Button>

							<Button
								disabled={cart.quantityItem(data.id) <= 1}
								variant='destructive'
								size='sm'
								className='ml-2 h-8 w-8 rounded-[100%] hover:scale-110'
								onClick={() => cart.addOrSubstractItem(data.id, -1)}
							>
								<MinusIcon className='h-5 w-5' />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
