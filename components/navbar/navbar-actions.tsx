'use client';

import CustomButton from '@/components/ui/custom-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import useCart from '@/hooks/use-cart';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchProduct from '@/components/search/search-product';

export const NavbarActions = () => {
	const [isMounted, setIsMounted] = useState(false);

	const cart = useCart();
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<SearchProduct />
			<CustomButton
				onClick={() => router.push('/cart')}
				className='flex items-center rounded-full dark:border dark:border-gray-200 px-4 py-2'
			>
				<ShoppingBag size={20} />
				<span className='ml-2 text-sm font-medium'>{cart.quantityItemSum()}</span>
			</CustomButton>
			<ThemeToggle />
		</div>
	);
};
