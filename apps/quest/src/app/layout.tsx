'use server';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { userAgent } from 'next/server';

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
					<LayoutClient reqUserAgent={reqUserAgent}>{children}</LayoutClient>
				</ReactNativeRegistry>
				<Script src="https://telegram.org/js/telegram-widget.js" />
			</body>
		</html>
	);
}
