import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { tracker } from '@/utils/analytic';

export const useScreenAnalytic = () => {
	const pathname = usePathname();

	useEffect(() => {
		tracker.logScreenView(pathname, pathname);
	}, [pathname]);
};
