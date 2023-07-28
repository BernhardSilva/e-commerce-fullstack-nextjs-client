import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
	const response = await fetch(`${URL}/${id}`, { cache: 'no-store' });
	return response.json();
};

export default getProduct;
