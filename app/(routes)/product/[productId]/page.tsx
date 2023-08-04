import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/gallery';
import ProductInfo from '@/components/product/product-info';
import ProductList from '@/components/product/product-list';
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
					<div className='lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8'>
						<Gallery images={product.images} />
						<div className='mt-10 px-4 sm:mt-16 sm:px-8 lg:mt-0'>
							<ProductInfo data={product} />
						</div>
					</div>
					<hr className='my-10' />
					<ProductList title='Related Items' items={suggestedProducts} />
				</div>
			</Container>
		</div>
	);
};

export default ProductPage;
