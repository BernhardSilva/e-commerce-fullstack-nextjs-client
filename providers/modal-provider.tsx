'use client';

import PreviewModal from '@/components/modal/preview-modal';
import { useHydration } from '@/hooks/use-hydration';

const ModalProvider = () => {
	const isMounted = useHydration();
	if (!isMounted) return null;

	return (
		<>
			<PreviewModal />
		</>
	);
};

export default ModalProvider;
