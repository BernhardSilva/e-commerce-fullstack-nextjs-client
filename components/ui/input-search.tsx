'use client';

import { Input } from './input';
import Spinner from './spinner';

interface Props {
	inputValue: string;
	setInputValue: (value: string) => void;
	isHandling?: boolean;
}

const InputSearch = ({ inputValue, setInputValue, isHandling }: Props) => {
	return (
		<div className='relative mt-8 mb-5'>
			<Input
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				placeholder='Search products...'
				className='text-base'
			/>
			{isHandling && (
				<div className='absolute top-2 right-2'>
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default InputSearch;
