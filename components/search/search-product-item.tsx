import { SearchProductProps } from './search-product';

interface SearchProductItemProps {
	products: SearchProductProps[] | undefined;
	handleSelectProduct: (id: string) => void;
}

const SearchProductItem = ({ products, handleSelectProduct }: SearchProductItemProps) => {
	return (
		<div>
			{products?.map((item, index) => (
				<ul
					className={`text-white px-4 py-2 cursor-pointer hover:bg-slate-800
                                    w-[225px] h-max-[60px] grid place-items-center justify-center
                                    ${
                                        index === products.length - 1 && products.length > 1
                                        ? 'rounded-b-xl rounded-t-none hover:rounded-t-none'
                                        : index === 0 && products.length > 1
                                        ? 'rounded-t-xl rounded-b-none hover:rounded-b-none'
                                        : products.length === 1
                                        ? 'rounded-xl hover-rounded-xl'
                                        : ''
																		} `}
					key={item.id}
					onClick={() => handleSelectProduct(item.id)}
				>
					{item.name.length > 45 ? `${item.name.slice(0, 45)}...` : item.name}
				</ul>
			))}
		</div>
	);
};

export default SearchProductItem;
