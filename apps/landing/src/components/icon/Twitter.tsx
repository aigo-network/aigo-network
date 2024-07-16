import type { FC } from 'react';

import type { IconProps } from './shared';

const TwitterIcon: FC<IconProps> = ({ size = 26, color = '#fdfdfd' }) => {
	const height = (size * 24) / 26;

	return (
		<svg width={size} height={height} viewBox="0 0 26 24" fill="none">
			<path
				d="M20.0023 0.725586H23.8976L15.3886 10.4755L25.3998 23.745H17.5621L11.419 15.6988L4.39779 23.745H0.498924L9.5993 13.313L0 0.7274H8.03721L13.5816 8.08063L20.0023 0.725586ZM18.6325 21.4083H20.7915L6.85794 2.94081H4.54293L18.6325 21.4083Z"
				fill={color}
			/>
		</svg>
	);
};

export default TwitterIcon;
