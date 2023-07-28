import { Store } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores/${process.env.NEXT_PUBLIC_API_STORE}`;

const getStore = async (): Promise<Store> => {
	const res = await fetch(URL, { cache: 'no-store' });

	return res.json();
};

export default getStore;
