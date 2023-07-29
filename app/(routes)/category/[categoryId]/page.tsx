import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import { Billboards } from '@/components/billboards';
import ProductCard from '@/components/products/product-card';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

interface CategoryPageProps {
	params: {
		categoryId: string;
	};
	searchParams: {
		colorId: string;
		sizeId: string;
	};
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
	const products = await getProducts({
		categoryId: params.categoryId,
		colorId: searchParams?.colorId,
		sizeId: searchParams?.sizeId
	});

	const sizes = await getSizes();
	const colors = await getColors();
	const category = await getCategory(params.categoryId);
	
	return (
		<div>
			<Container>
				<Billboards data={[category.billboard]} />
				<div className='px-4 sm:px-6 lg:px-8 pb-24'>
					<div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
						<MobileFilters sizes={sizes} colors={colors} />
						<div className='hidden lg:block'>
							<Filter valueKey='sizeId' name='Sizes' data={sizes} />
							<Filter valueKey='colorId' name='Colors' data={colors} />
						</div>
					</div>
					<div className='mt-6 lg:col-span-4 lg:mt-0'>
						{products.length === 0 && <NoResults />}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
							{products.map((item) => (
								<ProductCard key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default CategoryPage;
