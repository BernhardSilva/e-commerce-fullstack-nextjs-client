'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface MainNavProps {
	data: Category[];
}

const MainNav = ({ data }: MainNavProps) => {
	const pathname = usePathname();

	const routes = data.map((route) => ({
		href: `/category/${route.id}`,
		label: route.name,
		active: pathname === `/category/${route.id}`
	}));

	return (
		<nav className='mx-6 flex items-center space-x-4 lg:space-x-6'>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-black dark:hover:text-white',
						route.active ? 'font-semibold text-black dark:text-white' : 'text-neutral-500'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
};

export default MainNav;
