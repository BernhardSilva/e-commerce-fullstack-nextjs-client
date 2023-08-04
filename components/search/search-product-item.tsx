import { Product } from '@/types';
import Image from 'next/image';

interface SearchProductItemProps {
	products: Product[] | undefined;
	handleSelectProduct: (id: string) => void;
}

const SearchProductItem = ({ products, handleSelectProduct }: SearchProductItemProps) => {
	return (
		<div>
			{products?.map((product, index) => (
				<ul
					className={`text-white px-4 py-2 cursor-pointer hover:bg-green-800 dark:hover:bg-green-700
                                    w-full h-max-[60px] grid justify-start
                                    ${
										//position 0 of the list
										index === 0 && products?.length > 1
										? 'rounded-t-xl rounded-b-none hover:rounded-b-none'
										//only 1 product in the list
										: products?.length === 1
										? 'rounded-xl hover-rounded-xl'
										//last position of the list
										: index === products?.length - 1 && products?.length > 1
										? 'rounded-b-xl rounded-t-none hover:rounded-t-none'
										//middle positions of the list
										:''
									} `}
					key={product?.id}
					onClick={() => handleSelectProduct(product?.id)}
				>
					<div className='inline-flex'>
						<div className='grid items-center min-w-[30px]'>
							<Image
								src={product?.images[0]?.url}
								alt={product?.images[0].id}
								className='w-[30px] h-[30px] rounded-full'
								width={30}
								height={30}
							/>
						</div>
						<div className='ml-3'>
							{product?.name?.length > 45 ? `${product?.name?.slice(0, 45)}..` : product?.name}
						</div>
					</div>
				</ul>
			))}
		</div>
	);
};

export default SearchProductItem;
