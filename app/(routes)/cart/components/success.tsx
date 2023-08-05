import Confetti from 'react-confetti';

const SuccessPage = () => {
	return (
		<div className='p-10'>
			<div className='grid place-items-center text-center w-full'>
				<h1 className='text-2xl font-bold mb-4 text-green-500 dark:text-green-400'>Payment Successful!</h1>
				<div className='mb-4 text-green-600 dark:text-green-500'>Thank you for your purchase!</div>
			</div>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				numberOfPieces={1000}
				gravity={0.1}
				opacity={0.8}
				colors={['#ffce00', '#ff6b6b', '#b967ff', '#4cb1f7']}
				recycle={false}
				run={true}
			/>
		</div>
	);
};

export default SuccessPage;
