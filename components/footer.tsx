import getStore from '@/actions/get-store';

const Footer = async () => {
	const store = await getStore();
	return (
		<footer className='bg-white border-t dark:border-slate-900 dark:bg-slate-950 mt-4'>
			<div className='mx-auto py-10'>
				<p className='text-center text-xs'>&copy; 2023 {store.name}, Inc. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
