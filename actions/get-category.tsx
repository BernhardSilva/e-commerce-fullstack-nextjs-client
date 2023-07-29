import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/categories`;

const getCategory = async (id: string): Promise<Category> => {
	const res = await fetch(`${URL}/${id}`, {
		next: {
			revalidate: 60
		}
	});
	return res.json();
};

export default getCategory;
