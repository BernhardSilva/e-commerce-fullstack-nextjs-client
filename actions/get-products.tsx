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

	// 'Origin': 'https://e-commerce-cms-client.vercel.app',
	// 'Referer': 'https://e-commerce-cms-client.vercel.app/',
	// ':authority': 'e-commerce-cms-admin.vercel.app',

	// ':scheme': 'https',
	// 'Accept': '*/*',
	// 'Accept-Encoding': 'gzip, deflate, br',
	// 'Origin': `${process.env.NEXT_ORIGIN_API}`,
	// 'Referer': `${process.env.NEXT_REFERER_API}`,
	// 'Sec-Fetch-Dest': 'empty',
	// 'Sec-Fetch-Mode': 'cors',
	// 'Sec-Fetch-Site': 'cross-site',
	// 'Sec-Gpc': '1'
	const res = await fetch(url, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain'
		}
	});
	return res.json();
};

export default getProducts;
