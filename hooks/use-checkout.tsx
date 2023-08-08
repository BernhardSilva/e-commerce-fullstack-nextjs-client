import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import useCart from './use-cart';
import { postCheckout } from '@/actions/post-checkout';

export const useCheckout = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = React.useState(false);

	const { items, removeAll, totalPriceCartSum } = useCart();
	const totalSum = totalPriceCartSum();

	React.useEffect(() => {
		if (searchParams.get('success')) {
			toast.success('Payment completed.');
			removeAll();
		}

		if (searchParams.get('canceled')) {
			toast.error('Order canceled.');
		}
	}, [searchParams, removeAll, router]);

	//checkout order
	const onCheckout = async () => {
		try {
			setLoading(true);
			await postCheckout(items);
		} catch (error) {
			toast.error('Something went wrong.');
			console.error(error);
			setLoading(true);
		} finally {
			setLoading(false);
		}
	};
	return {
		totalSum,
		searchParams,
		onCheckout,
		loading,
		items
	};
};
