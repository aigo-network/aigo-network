import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
	color?: ColorValue;
	// strokeWidth?: string;
};

export const Clock: FC<Props> = ({
	width = 8,
	color = '#FDFDFD',
	// strokeWidth = '2',
}) => {
	const height = (width * 9) / 8;

	return (
		<Svg width={width} height={height} viewBox="0 0 8 9" fill={color as string}>
			<Path
				d="M3.80124 0.518555C5.90067 0.518555 7.60248 2.24303 7.60248 4.37041C7.60248 6.49778 5.90067 8.22226 3.80124 8.22226C1.70182 8.22226 0 6.49778 0 4.37041C0 2.24303 1.70182 0.518555 3.80124 0.518555ZM3.80124 2.0593C3.70043 2.0593 3.60374 2.09988 3.53245 2.17211C3.46117 2.24435 3.42112 2.34232 3.42112 2.44448V4.37041C3.42114 4.47256 3.4612 4.57051 3.53249 4.64273L4.67287 5.79829C4.74456 5.86845 4.84058 5.90728 4.94025 5.9064C5.03991 5.90552 5.13525 5.86501 5.20573 5.7936C5.27621 5.72218 5.31619 5.62557 5.31705 5.52458C5.31792 5.42358 5.27961 5.32628 5.21036 5.25364L4.18137 4.21094V2.44448C4.18137 2.34232 4.14132 2.24435 4.07003 2.17211C3.99874 2.09988 3.90206 2.0593 3.80124 2.0593Z"
				fill={color}
			/>
		</Svg>
	);
};

export default Clock;
