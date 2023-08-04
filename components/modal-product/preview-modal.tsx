'use client';

import Gallery from '@/components/gallery';
import Info from '@/components/modal-product/info-modal';
import Modal from '@/components/ui/modal';
import usePreviewModal from '@/hooks/use-preview-modal';

const PreviewModal = () => {
	const { isOpen, onClose, data } = usePreviewModal();
	const product = data;

	if (!product) {
		return null;
	}

	return (
		<Modal open={isOpen} onClose={onClose}>
			<div
				className='p-2 grid w-full grid-cols-1 items-start gap-x-6
				gap-y-8 sm:grid-cols-12 lg:gap-x-8
				dark:bg-slate-900 dark:text-white
				'
			>
				<div className='sm:col-span-4 lg:col-span-5'>
					<Gallery images={product.images} />
				</div>
				<div className='sm:col-span-8 lg:col-span-7'>
					<Info data={product} />
				</div>
			</div>
		</Modal>
	);
};

export default PreviewModal;
