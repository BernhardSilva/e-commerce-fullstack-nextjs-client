import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/categories`;

const getCategories = async (): Promise<Category[]> => {
	const response = await fetch(URL, { cache: 'no-store' });
	return response.json();
};

export default getCategories;
