'use client';

import { useEffect, useState } from 'react';

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

type CurrencyProps = {
	value?: string;
};

const Currency = ({ value }: CurrencyProps) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return <div>{formatter.format(Number(value))}</div>;
};

export default Currency;
