'use client';

import getProducts from '@/actions/get-products';
import { useDebounce } from '@/hooks/use-debounce';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import InputSearch from '../ui/input-search';
import SearchProductItem from './search-product-item';
import { cn } from '@/lib/utils';

interface SearchProductProps {
	className?: string;
	inputClassName?: string;
	dropDownClassName?: string;
}

const SearchProduct = ({ className, inputClassName, dropDownClassName }: SearchProductProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [products, setProducts] = useState<Product[]>();
	const router = useRouter();
	const searchResultsRef = useRef<HTMLDivElement>(null);
	const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
	const debouncedValue = useDebounce(inputValue);

	const filterProducts = async (query: string) => {
		try {
			const products = await getProducts({ productName: query, isFeatured: true });
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
		<>
			<div className={cn(`relative mb-2.5`, className)} onClick={handleSearchResultsOpen}>
				<InputSearch
					inputValue={inputValue}
					setInputValue={setInputValue}
					isHandling={isValidating}
					className={inputClassName}
				/>

				<div
					className={cn(
						dropDownClassName
							? dropDownClassName
							: `absolute z-50 bg-black opacity-90 rounded-t-xl rounded-b-xl translate-y-[-5%]
				dark:bg-slate-800 text-white ${isSearchResultsOpen ? '' : 'hidden'}`
					)}
					ref={searchResultsRef}
				>
					{inputValue !== '' && <SearchProductItem products={products} handleSelectProduct={handleSelectProduct} />}
				</div>
			</div>
		</>
	);
};

export default SearchProduct;
