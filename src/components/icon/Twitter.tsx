import type { FC } from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

type Props = {
	width: number;
};

export const Twitter: FC<Props> = ({ width = 10 }) => {
	const height = width;

	return (
		<Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
			<G clipPath="url(#clip0_841_3181)">
				<Path
					d="M11.4234 8.40856L17.8961 0.884521H16.3623L10.742 7.41754L6.2531 0.884521H1.07568L7.86379 10.7636L1.07568 18.6537H2.6096L8.54477 11.7546L13.2854 18.6537H18.4628L11.423 8.40856H11.4234ZM9.32246 10.8506L8.63469 9.86691L3.1623 2.03923H5.51831L9.93459 8.35642L10.6224 9.34015L16.363 17.5515H14.007L9.32246 10.851V10.8506Z"
					fill={'black'}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_841_3181">
					<Rect
						width="17.7692"
						height="17.7692"
						fill="white"
						transform="translate(0.884766 0.884521)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default Twitter;
