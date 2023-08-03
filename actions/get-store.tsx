import { Store } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores/${process.env.NEXT_PUBLIC_API_STORE}`;

const getStore = async (): Promise<Store> => {
	const res = await fetch(URL, {
		next: {
			revalidate: 10 //name of the store revalidate each 30s
		}
	});

	return res.json();
};

export default getStore;
