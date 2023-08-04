import Link from 'next/link';

import getCategories from '@/actions/get-categories';
import getStore from '@/actions/get-store';
import { NavbarActions } from '@/components/navbar/navbar-actions';
import NavbarLinks from '@/components/navbar/navbar-links';
import Container from '@/components/ui/container';
import SearchProduct from '../search/search-product';

const Navbar = async () => {
	const categories = await getCategories();
	const store = await getStore();

	return (
		<div className='border-b'>
			<Container>
				<nav className='px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 w-full place-content-center'>
					<div className='inline-flex items-center'>
						<Link href='/' className='ml-4 flex lg:ml-0 gap-x-2'>
							<p className='font-bold text-xl'>{store.name}</p>
						</Link>
						<div className='hidden lg:block'>
							<NavbarLinks data={categories} />
						</div>
					</div>
					{/* search */}
					<div className='grid place-items-center'>
						<SearchProduct className='hidden sm:block min-w-[223px] w-8/12' />
					</div>
					<NavbarActions />
				</nav>
			</Container>
			<div>
				{/* mobile search */}
				<SearchProduct
					className='sm:hidden block'
					inputClassName='mx-4'
					dropDownClassName='mx-4 mt-1 absolute z-50 bg-black
					opacity-90 rounded-t-xl rounded-b-xl'
				/>
			</div>
		</div>
	);
};

export default Navbar;
