import { cn } from '@/lib/utils';
import React, { MouseEventHandler } from 'react';

interface IconButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	icon: React.ReactElement;
	className?: string;
	disabled?: boolean;
}

const IconButton = ({ onClick, icon, className, disabled }: IconButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={cn(
				`rounded-full flexitems-center justify-centerborder shadow-md p-2 
					disabled:cursor-auto disabled:hover:scale-100 hover:scale-125 transition
				 bg-black border border-white hover:text-green-500 hover:border hover:border-green-500`,
				className
			)}
		>
			{icon}
		</button>
	);
};

export default IconButton;
