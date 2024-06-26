import { Inter_Tight, Poppins, Righteous } from 'next/font/google';

export const interTight = Inter_Tight({ subsets: ['latin'] });
export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});
export const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });
