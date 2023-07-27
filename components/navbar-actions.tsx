'use client';

import Button from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export const NavbarActions = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<Button className='flex items-center rounded-full bg-black px-4 py-2'>
				<ShoppingBag size={20} color='white' />
			</Button>
			<span className='ml-2 text-sm font-medium text-black dark:text-white'>0</span>
		</div>
	);
};
