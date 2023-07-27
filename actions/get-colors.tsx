import { Color } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
	try {
		const response = await fetch(URL, { cache: 'no-store' });
		return response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};

export default getColors;
