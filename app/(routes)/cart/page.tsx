'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary';
import CartItem from './components/cart-item';

const CartPage = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { items } = useCart();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<Container>
				<div className='px-4 py-16 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold'>Shopping Cart</h1>
					<div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
						<div className='lg:col-span-7'>
							{items.length === 0 && <p className='text-neutral-500'>No items added to cart.</p>}
							<ul>
								{items.map((item) => (
									<CartItem key={item.id} data={item} />
								))}
							</ul>
						</div>
						<Summary />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default CartPage;
