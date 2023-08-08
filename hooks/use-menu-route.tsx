import { PathUrlTypes } from '@/types';
import { useRouter } from 'next/navigation';

export const useMenuRoute = () => {
	const router = useRouter();

	const pushRoute = (path: keyof PathUrlTypes, id?: string) => {
		const pathUrl = path as string;
		if (pathUrl) {
			router.push(`/${pathUrl}${id ? `/${id}` : ''}`);
		}
	};

	return pushRoute;
};
