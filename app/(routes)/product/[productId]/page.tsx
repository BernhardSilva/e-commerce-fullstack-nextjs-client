import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/products/product-list';
import Container from '@/components/ui/container';

interface ProductPageProps {
	params: {
		productId: string;
	};
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const product = await getProduct(params.productId);
	const suggestedProducts = await getProducts({
		categoryId: product?.category?.id
	});

	if (!product) {
		return null;
	}

	return (
		<div>
			<Container>
				<div className='px-4 py-10 sm:px-6 lg:px-8'>
					<div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
						{/* Gallery */}
						<div className='mt-10 px-4 sm:mt-16 sm:px-8 lg:mt-0'>GALLRY</div>
					</div>
					<hr className='my-10' />
					<ProductList title='Related Items' items={suggestedProducts} />
				</div>
			</Container>
		</div>
	);
};

export default ProductPage;
