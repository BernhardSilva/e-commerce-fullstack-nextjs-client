import { Product } from '@/types';
import NoResults from '../ui/no-results';
import ProductCard from './product-card';

interface ProductsProps {
	title: string;
	items: Product[];
}

const ProductList = ({ title, items }: ProductsProps) => {
	return (
		<div>
			<div className='space-y-4'>
				<h3 className='font-bold text-3xl'>{title}</h3>
				{items.length === 0 && <NoResults />}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{items.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
