'use client';

import { useScreenAnalytic } from '@/hooks/analytic';
import type { UserAgent } from '@/utils/helper';
import { UserAgentContext } from '@/utils/helper';

export default function LayoutClient({
	reqUserAgent,
	children,
}: {
	reqUserAgent: UserAgent;
	children: React.ReactNode;
}) {
	useScreenAnalytic();

	return (
		<UserAgentContext.Provider value={reqUserAgent}>
			{children}
		</UserAgentContext.Provider>
	);
}
