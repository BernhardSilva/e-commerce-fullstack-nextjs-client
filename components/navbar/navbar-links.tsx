'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Category } from '@/types';
import useCategory from '@/hooks/use-category';
import { useEffect } from 'react';

interface MainNavProps {
	data: Category[];
}

const NavbarLinks = ({ data }: MainNavProps) => {
	console.log("🚀 ~ file: navbar-links.tsx:16 ~ NavbarLinks ~ data:", data)
	const pathname = usePathname();
	const { addCategories } = useCategory();

	useEffect(() => {
		addCategories(data);
	}, [data, addCategories]);

	const routes = data.map((route) => ({
		href: `/category/${route.id}`,
		label: route.name,
		active: pathname === `/category/${route.id}`
	}));

	return (
		<div className='mx-6 flex items-center space-x-4 lg:space-x-6'>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-green-500 dark:hover:text-green-500 hover:text-base',
						route.active ? 'font-semibold text-black dark:text-white ' : 'text-neutral-500 '
					)}
				>
					{route.label}
				</Link>
			))}
		</div>
	);
};

export default NavbarLinks;
