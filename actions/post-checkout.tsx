import axios from 'axios';
import { CartProduct } from '../hooks/use-cart';

export const postCheckout = async (items: CartProduct[]) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_STORE}/checkout`,
		{
			items
		}
	);

	return (window.location = response.data.url);
};
