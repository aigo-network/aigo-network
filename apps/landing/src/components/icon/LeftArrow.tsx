import type { FC } from 'react';

import type { IconProps } from './shared';

const LeftArrow: FC<IconProps> = ({ size = 23, color = '#fdfdfd' }) => {
	const height = (size * 14) / 23;

	return (
		<svg width={size} height={height} viewBox="0 0 23 14" fill="none">
			<path
				d="M20.9822 5.99796L3.4158 5.99796L6.70681 2.70691C7.65213 1.76161 6.23416 0.343714 5.28884 1.28901L2.29161 4.2909L0.290798 6.29486C-0.0969772 6.68494 -0.0969772 7.31494 0.290798 7.70503L5.28884 12.7089C5.479 12.9043 5.74074 13.014 6.01345 13.0117C6.91365 13.0116 7.35543 11.9151 6.70681 11.2909L3.40799 7.99984L21.034 7.99984C22.4204 7.93105 22.3168 5.92895 20.9822 5.99796Z"
				fill={color}
			/>
		</svg>
	);
};

export default LeftArrow;
