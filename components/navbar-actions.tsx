'use client';

import CustomButton from '@/components/ui/custom-button';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const NavbarActions = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<CustomButton className='flex items-center rounded-full dark:border dark:border-zinc-400 px-4 py-2'>
				<ShoppingBag size={20} />
			</CustomButton>
			<ThemeToggle />
			<span className='ml-2 text-sm font-medium'>0</span>
		</div>
	);
};
