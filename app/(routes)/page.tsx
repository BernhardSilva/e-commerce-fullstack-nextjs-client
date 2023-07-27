import getBillboards from '@/actions/get-billboards';
import { Billboards } from '@/components/billboards';
import Container from '@/components/ui/container';

const HomePage = async () => {
	const billboard = await getBillboards();

	return (
		<Container>
			<div className='space-y-10 pb-10'>
				<Billboards data={billboard} />
			</div>
		</Container>
	);
};

export default HomePage;
