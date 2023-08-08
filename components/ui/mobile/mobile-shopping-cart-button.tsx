import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import React from 'react';

interface MobileShoppingCartButtonProps {
	cartQuantity: number;
	onClick: () => void;
	className?: string;
}

const MobileShoppingCartButton = ({ cartQuantity, onClick, className }: MobileShoppingCartButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				`flex items-center rounded-full border hover:border-2 bg-black text-white
						dark:border-gray-200 hover:border-green-500 dark:hover:border-green-500 px-3 py-1`,
				className
			)}
		>
			<ShoppingBag size={15} />
			<span className='ml-2 text-sm font-medium'>{cartQuantity}</span>
		</button>
	);
};

export default MobileShoppingCartButton;
