import { ShoppingBag } from 'lucide-react';
import React from 'react';

interface MobileShoppingCartButtonProps {
	cartQuantity: number;
	onClick: () => void;
}

const MobileShoppingCartButton = ({ cartQuantity, onClick }: MobileShoppingCartButtonProps) => {
	return (
		<button
			onClick={onClick}
			className='flex items-center rounded-full border hover:border-2 bg-black text-white
						dark:border-gray-200 hover:border-green-500 dark:hover:border-green-500 px-3 py-1'
		>
			<ShoppingBag size={15} />
			<span className='ml-2 text-sm font-medium'>{cartQuantity}</span>
		</button>
	);
};

export default MobileShoppingCartButton;
