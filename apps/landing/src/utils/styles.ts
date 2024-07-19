import { DM_Sans, Poppins, Raleway } from 'next/font/google';
import localFont from 'next/font/local';

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
export const poppins = Poppins({
	display: 'swap',
	subsets: ['latin'],
	weight: '600',
});
export const clashDisplay = localFont({
	src: '../../public/font/ClashDisplay-Variable.woff2',
	display: 'swap',
});
