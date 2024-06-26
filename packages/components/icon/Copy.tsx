import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
	color?: ColorValue;
	fill?: boolean;
};

export const Copy: FC<Props> = ({
	color = 'white',
	width = 10,
	fill = false,
}) => {
	const height = width;

	return (
		<Svg width={width} height={height} viewBox="0 0 13 13" fill="none">
			<Path
				d="M3.1665 4.94475C3.1665 4.47319 3.35383 4.02095 3.68727 3.68751C4.02071 3.35407 4.47295 3.16675 4.9445 3.16675H10.7218C10.9553 3.16675 11.1865 3.21274 11.4022 3.30209C11.618 3.39144 11.814 3.52241 11.9791 3.68751C12.1442 3.85261 12.2751 4.04862 12.3645 4.26434C12.4538 4.48005 12.4998 4.71126 12.4998 4.94475V10.7221C12.4998 10.9556 12.4538 11.1868 12.3645 11.4025C12.2751 11.6182 12.1442 11.8142 11.9791 11.9793C11.814 12.1444 11.618 12.2754 11.4022 12.3647C11.1865 12.4541 10.9553 12.5001 10.7218 12.5001H4.9445C4.71101 12.5001 4.47981 12.4541 4.26409 12.3647C4.04838 12.2754 3.85237 12.1444 3.68727 11.9793C3.52217 11.8142 3.3912 11.6182 3.30185 11.4025C3.21249 11.1868 3.1665 10.9556 3.1665 10.7221V4.94475Z"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				fill={fill ? color : 'transparent'}
			/>
			<Path
				d="M1.17467 9.658C0.97 9.54172 0.799766 9.37332 0.681267 9.16993C0.562767 8.96653 0.500226 8.73539 0.5 8.5V1.83333C0.5 1.1 1.1 0.5 1.83333 0.5H8.5C9 0.5 9.272 0.756667 9.5 1.16667"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default Copy;
