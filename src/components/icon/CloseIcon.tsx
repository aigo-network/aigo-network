import type { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
	width?: number;
};

export const CloseIcon: FC<Props> = ({ width = 18 }) => {
	const height = width;

	return (
		<Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
			<Path
				d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
				fill="#F0F0F0"
			/>
			<Path d="M6 6L12 12L6 6ZM12 6L6 12L12 6Z" fill="#F0F0F0" />
			<Path
				d="M6 6L12 12M12 6L6 12"
				stroke="#6740FF"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export default CloseIcon;
