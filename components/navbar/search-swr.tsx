'use client';

import getProducts from '@/actions/get-products';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import InputSearch from '../ui/input-search';

interface Product {
	id: string;
	name: string;
}

const SearchPage = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [debouncedValue, setDebouncedValue] = useState<string>('');
	const [products, setProducts] = useState<Product[]>();
	const router = useRouter();
	const searchResultsRef = useRef<HTMLDivElement>(null);
	const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);

	const searchProducts = async (query: string) => {
		try {
			const response = await getProducts({ productName: query });
			return response;
		} catch (error) {
			console.log('🚀esponse:', error);
		}
	};

	const handleSearchResultsOpen = () => {
		setIsSearchResultsOpen(!isSearchResultsOpen);
	};

	const { data: productData, isValidating } = useSWR(debouncedValue ?? null, searchProducts);

	// EFFECTS: Set Data
	useEffect(() => {
		// If search is active, set products to search results
		if (debouncedValue.length > 0) {
			// If there is a result, set products to result
			if (productData) {
				setProducts(productData);
			}
			// If there is no result, set products to empty array
			else {
				setProducts([]);
			}
		}
		// If search is not active, set products to initial data
		else {
			setProducts([]);
		}
	}, [productData, debouncedValue]);

	// EFFECT: Debounce Input Value
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(inputValue);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [inputValue]);

	const handleSelectProduct = (id: string) => {
		router.push(`/product/${id}`);
		setProducts([]);
		setInputValue('');
	};

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (isSearchResultsOpen && searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
				setIsSearchResultsOpen(false);
				setProducts([]);
				setInputValue('');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSearchResultsOpen]);

	return (
		<div className='relative mb-2.5' onClick={handleSearchResultsOpen}>
			<InputSearch inputValue={inputValue} setInputValue={setInputValue} isHandling={isValidating} />

			<div
				className={`absolute inset-x-0 z-50 bg-black opacity-80 rounded-t-xl rounded-b-xl
                 dark:bg-slate-700 text-white ${isSearchResultsOpen ? '' : 'hidden'}`}
				ref={searchResultsRef}
			>
				{inputValue !== '' && (
					<div>
						{products?.map((item, index) => (
							<ul
								className={`text-white px-4 py-2 cursor-pointer hover:bg-slate-800 ${
									index === products.length - 1 ? 'rounded-b-xl rounded-t-none' : index === 0 ? 'rounded-t-xl' : ''
								}`}
								key={item.id}
								onClick={() => handleSelectProduct(item.id)}
							>
								{item.name}
							</ul>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
