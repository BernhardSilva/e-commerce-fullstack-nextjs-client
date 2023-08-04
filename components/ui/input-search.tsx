'use client';

import { cn } from '@/lib/utils';
import { Input } from './input';
import Spinner from './spinner';

interface Props {
	inputValue: string;
	setInputValue: (value: string) => void;
	isHandling?: boolean;
	className?: string;
}

const InputSearch = ({ inputValue, setInputValue, isHandling, className }: Props) => {
	return (
		<div className={cn(className ? className : 'relative mt-8 mb-5')}>
			<Input
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				placeholder='Search products...'
				className='text-base'
			/>
			{isHandling && (
				<div className="absolute top-2 md:right-2 right-6">
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default InputSearch;
