import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

interface Props {
	width?: number;
	color?: string;
}

const CoinStack: FC<Props> = ({ width = 24, color = '#5e5e5e' }) => {
	return (
		<Svg width={width} height={width} viewBox="0 0 24 24" fill="none">
			<Path
				d="M18.5 12.6504V16.3504C18.5 19.4704 15.59 22.0004 12 22.0004C8.41 22.0004 5.5 19.4704 5.5 16.3504V12.6504C5.5 15.7704 8.41 18.0004 12 18.0004C15.59 18.0004 18.5 15.7704 18.5 12.6504Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 6.09 6.22999 4.68 7.39999 3.66C8.57999 2.63 10.2 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M18.5 7.65V12.65C18.5 15.77 15.59 18 12 18C8.41 18 5.5 15.77 5.5 12.65V7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default CoinStack;
