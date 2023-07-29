import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/categories`;

const getCategories = async (): Promise<Category[]> => {
	const res = await fetch(URL, { cache: 'no-store' });
	return res.json();
};

export default getCategories;
