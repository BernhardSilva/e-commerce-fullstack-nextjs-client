import { Store } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores/${process.env.NEXT_PUBLIC_API_STORE}`;

const getStore = async (): Promise<Store> => {
	const res = await fetch(URL, {
		next: {
			revalidate: 3600 //name of the store revalidate each 3600s (1 hour)
		}
	});

	return res.json();
};

export default getStore;
