'use server';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import AnalyticsProvider from './section/AnalyticsProvider';
import LayoutClient from './layoutClient';
import ReactNativeRegistry from './registry';

import './globals.css';

import { interTight } from '@/utils/style';

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: 'AiGO | Quests',
		description: 'Transform Your Mobility To Incentives',
	};
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const reqUserAgent = userAgent({ headers: headers() });

	return (
		<html lang="en">
			<body className={interTight.className}>
				<ReactNativeRegistry>
					<AnalyticsProvider>
						<LayoutClient reqUserAgent={reqUserAgent}>{children}</LayoutClient>
					</AnalyticsProvider>
				</ReactNativeRegistry>
			</body>
		</html>
	);
}
