'use client';


import Currency from '@/components/ui/currency';
import CustomButton from '@/components/ui/custom-button';
import { useCheckout } from '@/hooks/use-checkout';
import CanceledPage from './canceled';
import SuccessPage from './success';

const Summary = () => {
	const {items, loading, onCheckout, searchParams, totalSum} = useCheckout()

	return (
		<>
			<div className='mt-16 rounded-lg bg-slate-100 dark:bg-slate-900  px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
				{searchParams.get('success') ? <SuccessPage /> : searchParams.get('canceled') ? <CanceledPage /> : ''}
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
					className={`w-full mt-6 dark:border hover:border-2 dark:border-slate-700 ${
						loading && 'dark:hover:bg-slate-500'
					}`}
				>
					Checkout
				</CustomButton>
			</div>
		</>
	);
};

export default Summary;
