import { Product } from '@/types';

interface CartItemInfoProps {
	product: Product;
}

const CartItemInfo = ({ product }: CartItemInfoProps) => {
	return (
		<div>
			<div className='flex justify-between'>
				<p className=' text-sm font-semibold'>{product.name}</p>
			</div>

			<div className='mt-1 flex text-sm'>
				<p className='text-gray-500'>{product.color.value}</p>
				<p className='ml-4 border-l border-gray-200 pl-4 text-gray-500'>{product.size.name}</p>
			</div>
			<p className='mt-1 text-sm font-medium text-gray-900'>{product.price}</p>
		</div>
	);
};

export default CartItemInfo;
