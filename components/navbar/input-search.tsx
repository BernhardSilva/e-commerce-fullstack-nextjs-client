'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import Spinner from '../ui/spinner';

const InputSearch = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [debouncedValue, setDebouncedValue] = useState<string>('');
	const [mounted, setMounted] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleSearchParams = useCallback(
		(debouncedValue: string) => {
			let params = new URLSearchParams(window.location.search);
			if (debouncedValue.length > 0) {
				params.set('search', debouncedValue);
			} else {
				params.delete('search');
			}
			startTransition(() => {
				router.replace(`${pathname}?${params.toString()}`);
			});
				console.log("🚀 ~ file: input-search.tsx:27 ~ startTransition ~ pathname:", pathname)
		},
		[pathname, router]
	);

	// EFFECT: Set Initial Params
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const searchQuery = params.get('search') ?? '';
		setInputValue(searchQuery);
	}, []);

	// EFFECT: Set Mounted
	useEffect(() => {
		if (debouncedValue.length > 0 && !mounted) {
			setMounted(true);
		}
	}, [debouncedValue, mounted]);

	// EFFECT: Debounce Input Value
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(inputValue);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [inputValue]);

	// EFFECT: Search Params
	useEffect(() => {
		if (mounted) handleSearchParams(debouncedValue);
	}, [debouncedValue, handleSearchParams, mounted]);

	return (
		//input navbar at the top center of the screen

		<div className='absolute w-20 md:w-60 lg:w-80 top-3 right-1/3'>
			<Input
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				placeholder='Search products'
				className='text-base'
			/>
			{isPending && (
				<div className='absolute top-2 right-2'>
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default InputSearch;
