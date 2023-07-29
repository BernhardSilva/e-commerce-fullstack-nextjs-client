import { Size } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/sizes`;

const getSizes = async (): Promise<Size[]> => {
	const res = await fetch(URL, {
		next: {
			revalidate: 60
		}
	});
	return res.json();
};

export default getSizes;
