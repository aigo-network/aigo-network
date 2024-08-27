import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

interface Props {
	width?: number;
	color?: string;
}

const Ticket: FC<Props> = ({ width = 20, color = '#5e5e5e' }) => {
	return (
		<Svg width={width} height={width} viewBox="0 0 20 20" fill="none">
			<Path
				d="M16.75 10.4163C16.75 9.26634 17.6833 8.33301 18.8333 8.33301V7.49967C18.8333 4.16634 18 3.33301 14.6666 3.33301H6.33329C2.99996 3.33301 2.16663 4.16634 2.16663 7.49967V7.91634C3.31663 7.91634 4.24996 8.84967 4.24996 9.99967C4.24996 11.1497 3.31663 12.083 2.16663 12.083V12.4997C2.16663 15.833 2.99996 16.6663 6.33329 16.6663H14.6666C18 16.6663 18.8333 15.833 18.8333 12.4997C17.6833 12.4997 16.75 11.5663 16.75 10.4163Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M8.83337 3.33301L8.83337 16.6663"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray="5 5"
			/>
		</Svg>
	);
};

export default Ticket;
