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
import { useTheme } from 'next-themes';
import { useMenuRoute } from '../../../hooks/use-menu-route';
import MobileShoppingCartButton from '../../ui/mobile/mobile-shopping-cart-button';
import { ThemeToggle } from '../../ui/theme-toggle';
import MobileMenuCategory from './mobile-menu-category';

export function MobileNavbarActions() {
	const cartQuantitySum = useCart((state) => state.quantityItemSum());
	const { setTheme, theme } = useTheme();

	const menuRoute = useMenuRoute();

	const switchTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const handlePushCart = () => {
		menuRoute('cart');
	};

	return (
		<div className='mt-1 inline-flex gap-4 sm:mr-5'>
			<MobileShoppingCartButton onClick={handlePushCart} cartQuantity={cartQuantitySum} />
			<div className='flex justify-center'>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Menu size={35} className='cursor-pointer hover' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={switchTheme} className='cursor-pointer'>
							<ThemeToggle className='flex justify-center' />
							<span className='ml-2'>{theme === 'dark' ? 'Dark' : 'Light'}</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className='inline-flex'>
							<ArrowDown size={15} className='mr-1 mt-0.5' /> Categories
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{/* Mobile menu categories */}
						<MobileMenuCategory />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
