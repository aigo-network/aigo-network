import type { Metadata } from 'next';

import StyledComponentsRegistry from './registry';

import './globals.css';

import { DESCRIPTION, DOMAIN_URL, PROFILES, TITLE } from '@/utils/constant';
import { dmSans, raleway } from '@/utils/styles';

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		type: 'website',
		title: TITLE,
		description: DESCRIPTION,
		url: DOMAIN_URL,
		images: 'https://aigo.network/img/hero-img.png',
		siteName: TITLE,
	},
	twitter: {
		card: 'summary_large_image',
		title: TITLE,
		description: DESCRIPTION,
		site: DOMAIN_URL,
		creator: PROFILES.twitter.username,
		images: 'https://aigo.network/img/hero-img.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${dmSans.variable} ${raleway.variable}`}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
