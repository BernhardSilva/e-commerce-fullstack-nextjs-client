import { Product } from '@/types';
import queryString from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/products`;

interface Query {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	productName?: string;
	isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
	const url = queryString.stringifyUrl({
		url: URL,
		query: {
			productName: query?.productName,
			categoryId: query?.categoryId,
			colorId: query?.colorId,
			sizeId: query?.sizeId,
			isFeatured: query?.isFeatured
		}
	});

	const res = await fetch(url, { cache: 'no-store', method: 'GET' });
	return res.json();
};

export default getProducts;
