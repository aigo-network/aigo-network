import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
	color?: ColorValue;
};

export const Tick: FC<Props> = ({ color = '#fff', width = 10 }) => {
	const height = (width * 7) / 10;
	return (
		<Svg width={width} height={height} viewBox="0 0 10 7" fill="none">
			<Path
				d="M1 3.66667L3.66667 6L9 1"
				stroke={color}
				strokeOpacity="0.5"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default Tick;
