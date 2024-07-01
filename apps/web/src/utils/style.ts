import { DM_Sans, Inter_Tight, Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const interTight = Inter_Tight({ subsets: ['latin'] });
export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});
export const clashDisplay = localFont({
	src: '../../public/font/ClashDisplay-Variable.woff2',
	display: 'swap',
});
export const dmSans = DM_Sans({ subsets: ['latin'] });
