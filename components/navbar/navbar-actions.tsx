'use client';

import CustomButton from '@/components/ui/custom-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import useCart from '@/hooks/use-cart';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileNavbarActions } from './mobile-navbar-actions';

export const NavbarActions = () => {
	const [isMounted, setIsMounted] = useState(false);
	const quantitySum = useCart((state) => state.quantityItemSum());
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<div className='hidden sm:block'>
				<div className='flex items-center gap-x-4'>
					<CustomButton
						onClick={() => router.push('/cart')}
						className='flex items-center rounded-full border hover:border-2 
						dark:border-gray-200 hover:border-green-500 dark:hover:border-green-500 px-4 py-2'
					>
						<ShoppingBag size={20} />

						<span className='ml-2 text-sm font-medium'>{quantitySum}</span>
					</CustomButton>

					<ThemeToggle />
				</div>
			</div>
			<div className='block sm:hidden'>
				<MobileNavbarActions />
			</div>
		</div>
	);
};
