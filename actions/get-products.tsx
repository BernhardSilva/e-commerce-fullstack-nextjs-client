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

	const res = await fetch(url, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain',
			'Accept': '*/*',
			'Accept-Language': 'en-US,en',
			'Host': `${process.env.NEXT_HOST_API}`,
			'Origin': `${process.env.NEXT_ORIGIN_API}`,
			'Referer': `${process.env.NEXT_ORIGIN_API}/`,
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-site',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
		}
	});
	return res.json();
};

export default getProducts;
