import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
	color?: ColorValue;
	strokeWidth?: string;
};

export const ChevronDown: FC<Props> = ({ width, color, strokeWidth = '2' }) => {
	return (
		<Svg
			width={width}
			height={width}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path d="m6 9 6 6 6-6" />
		</Svg>
	);
};

export default ChevronDown;
