import { Product } from '@/types';
import queryString from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
	const url = queryString.stringifyUrl({
		url: URL,
		query: {
			colorId: query.colorId,
			sizeId: query.sizeId,
			categoryId: query.categoryId,
			isFeatured: query.isFeatured
		}
	});

	const response = await fetch(url, { cache: 'no-store' });
	return response.json();
};

export default getProducts;
