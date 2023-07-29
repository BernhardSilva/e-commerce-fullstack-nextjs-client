import { Billboard } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/billboards`;

const getBillboards = async (): Promise<Billboard[]> => {
	const res = await fetch(URL, { cache: 'no-store' });
	return res.json();
};

export default getBillboards;
