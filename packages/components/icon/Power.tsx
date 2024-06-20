import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
	color?: ColorValue;
	strokeWidth?: string;
};

export const Power: FC<Props> = ({ width = 24, color, strokeWidth = '2' }) => {
	const height = (width * 25) / 24;
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 25 24"
			fill="none"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<Path
				d="M7.5 6C6.28639 7.02477 5.41697 8.39771 5.00943 9.93294C4.60189 11.4682 4.67592 13.0915 5.2215 14.5833C5.76708 16.0751 6.75786 17.3632 8.05971 18.2732C9.36156 19.1833 10.9116 19.6714 12.5 19.6714C14.0884 19.6714 15.6384 19.1833 16.9403 18.2732C18.2421 17.3632 19.2329 16.0751 19.7785 14.5833C20.3241 13.0915 20.3981 11.4682 19.9906 9.93294C19.583 8.39771 18.7136 7.02477 17.5 6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M12.5 4V12" strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};

export default Power;
