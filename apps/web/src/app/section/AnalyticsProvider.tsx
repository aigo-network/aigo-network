'use client';

import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { tracker } from '@/utils/analytic';

interface Props {
	children: ReactNode;
}

const AnalyticsProvider: FC<Props> = ({ children }) => {
	const pathname = usePathname();

	useEffect(() => {
		tracker.logScreenView(pathname, pathname);
	}, [pathname]);

	return children;
};

export default AnalyticsProvider;
