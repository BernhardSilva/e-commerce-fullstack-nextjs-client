'use client';

import { useHydration } from '@/hooks/use-hydration';

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

type CurrencyProps = {
	value?: string | number;
};

const Currency = ({ value = 0 }: CurrencyProps) => {
	const isMounted = useHydration();
	if (!isMounted) return null;

	return <div className='font-semibold'>{formatter.format(Number(value))}</div>;
};

export default Currency;
