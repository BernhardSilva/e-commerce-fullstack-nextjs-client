'use client';

import getProducts from '@/actions/get-products';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import InputSearch from '../ui/input-search';
import SearchProductItem from './search-product-item';

export interface SearchProductProps {
	id: string;
	name: string;
}

const SearchProduct = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [products, setProducts] = useState<SearchProductProps[]>();
	const router = useRouter();
	const searchResultsRef = useRef<HTMLDivElement>(null);
	const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
	const debouncedValue = useDebounce(inputValue);

	const filterProducts = async (query: string) => {
		try {
			const products = await getProducts({ productName: query });
			return products;
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while searching for products');
		}
	};

	const cleanSearchResults = () => {
		setProducts([]);
		setInputValue('');
	};

	const handleSearchResultsOpen = () => {
		setIsSearchResultsOpen(!isSearchResultsOpen);
	};

	const { data: productData, isValidating } = useSWR(debouncedValue ?? null, filterProducts);

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

	const handleSelectProduct = (id: string) => {
		router.push(`/product/${id}`);
		cleanSearchResults();
	};

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (isSearchResultsOpen && searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
				setIsSearchResultsOpen(false);
				cleanSearchResults();
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
				className={`absolute inset-x-0 z-50 bg-black opacity-80 rounded-t-xl rounded-b-xl w-[225px]
                 dark:bg-slate-700 text-white ${isSearchResultsOpen ? '' : 'hidden'}`}
				ref={searchResultsRef}
				style={{ transform: 'translateY(-8%)' }}
			>
				{inputValue !== '' && <SearchProductItem products={products} handleSelectProduct={handleSelectProduct} />}
			</div>
		</div>
	);
};

export default SearchProduct;
