import useCategory from '@/hooks/use-category';
import { useMenuRoute } from '@/hooks/use-menu-route';
import { DropdownMenuItem } from '../../ui/dropdown-menu';

const MobileMenuCategory = () => {
	const { categories } = useCategory();
	const menuRoute = useMenuRoute();

	const handlePushCategory = (id: string) => {
		menuRoute('category', id);
	};

	return (
		<div>
			{categories.map((item) => (
				<DropdownMenuItem key={item.id} onClick={() => handlePushCategory(item?.id)} className='cursor-pointer'>
					{item.name}
				</DropdownMenuItem>
			))}
		</div>
	);
};

export default MobileMenuCategory;
