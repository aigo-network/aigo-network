import { DM_Sans, Raleway } from 'next/font/google';

export const raleway = Raleway({
	display: 'swap',
	subsets: ['latin'],
	variable: '--secondary-font',
});
export const dmSans = DM_Sans({
	display: 'swap',
	subsets: ['latin'],
	variable: '--primary-font',
});
