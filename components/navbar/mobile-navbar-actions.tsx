'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDown, Menu } from 'lucide-react';

import useCart from '@/hooks/use-cart';
import useCategory from '@/hooks/use-category';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import MobileShoppingCartButton from '../ui/mobile-shopping-cart-button';
import { ThemeToggle } from '../ui/theme-toggle';

export function MobileNavbarActions() {
	const router = useRouter();
	const cart = useCart();
	const cartQuantitySum = cart.quantityItemSum();
	const { setTheme, theme } = useTheme();
	console.log("🚀 ~ file: mobile-navbar-actions.tsx:24 ~ MobileNavbarActions ~ theme:", theme)
	const { categories } = useCategory();

	const handleClick = () => {

		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<div className='mt-1 inline-flex gap-4 sm:mr-5'>
			<MobileShoppingCartButton onClick={() => router.push('/cart')} cartQuantity={cartQuantitySum} />
			<div className='flex justify-center'>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Menu size={35} className='cursor-pointer hover' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleClick} className='cursor-pointer'>
							<ThemeToggle className='flex justify-center' />
							<span className='ml-2'>{theme === 'dark' ? 'Dark' : 'Light'}</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className='inline-flex'>
							<ArrowDown size={15} className='mr-1 mt-0.5' /> Categories
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{categories.map((item) => (
							<DropdownMenuItem
								key={item.id}
								onClick={() => router.push(`/category/${item?.id}`)}
								className='cursor-pointer'
							>
								{item.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
