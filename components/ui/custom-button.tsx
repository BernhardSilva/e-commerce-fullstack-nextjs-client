import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, disabled, type = 'button', ...props }, ref) => {
		return (
			<button
				disabled={disabled}
				ref={ref}
				{...props}
				className={cn(
					`w-auto rounded-full bg-black border-transparent px-5 py-3
                    disabled:cursor-not-allowed disabled:opacity-20
                  text-white font-semibold ${disabled &&'hover:opacity-75'} transition`,
					className
				)}
			>
				{children}
			</button>
		);
	}
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
