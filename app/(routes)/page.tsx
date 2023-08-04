import getBillboards from '@/actions/get-billboards';
import getProducts from '@/actions/get-products';
import { Billboards } from '@/components/billboards';
import ProductList from '@/components/product/product-list';
import Container from '@/components/ui/container';

const HomePage = async () => {
	const billboards = await getBillboards();
	const products = await getProducts({ isFeatured: true });

	return (
		<Container>
			<div className='space-y-10 pb-10'>
				<Billboards data={billboards} />
			</div>
			<div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px8'>
				<ProductList title='Featured Products' items={products} />
			</div>
		</Container>
	);
};

export default HomePage;
