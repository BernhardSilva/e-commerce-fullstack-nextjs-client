import * as React from 'react';

export const useHydration = () => {
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	return isMounted;
};
