'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Currency from '@/components/ui/currency';
import CustomButton from '@/components/ui/custom-button';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Summary = () => {
	const searchParams = useSearchParams();
	const items = useCart((state) => state.items);
	const removeAll = useCart((state) => state.removeAll);
	const totalSum = useCart((state) => state.totalPriceCartSum());

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchParams.get('success')) {
			toast.success('Payment completed.');
			removeAll();
		}

		if (searchParams.get('canceled')) {
			toast.error('Something went wrong.');
		}
	}, [searchParams, removeAll]);

	//checkout order
	const onCheckout = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_STORE}/checkout`,
				{
					items
				}
			);

			window.location = response.data.url;
		} catch (error) {
			toast.error('Something went wrong.');
			console.error(error);
			setLoading(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mt-16 rounded-lg bg-slate-100 dark:bg-slate-900  px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
			<h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Order summary</h2>
			<div className='mt-6 space-y-4'>
				<div className='flex items-center justify-between border-t border-slate-800 pt-4'>
					<div className='text-base font-medium text-gray-900'>Order total</div>
					<Currency value={totalSum} />
				</div>
			</div>
			<CustomButton
				onClick={onCheckout}
				disabled={loading || items.length === 0}
				className={`w-full mt-6 dark:border dark:border-slate-700 dark:hover:bg-slate-500`}
			>
				Checkout
			</CustomButton>
		</div>
	);
};

export default Summary;
