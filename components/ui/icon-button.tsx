import { cn } from '@/lib/utils';
import React, { MouseEventHandler } from 'react';

interface IconButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	icon: React.ReactElement;
	className?: string;
}

const IconButton = ({ onClick, icon, className }: IconButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'rounded-full flexitems-center justify-centerborder shadow-md p-2 hover:scale-125 transition bg-black border border-white hover:text-green-500 hover:border hover:border-green-500',
				{
					className
				}
			)}
		>
			{icon}
		</button>
	);
};

export default IconButton;
