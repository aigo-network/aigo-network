import type { FC } from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

type Props = {
	width: number;
};

export const Telegram: FC<Props> = ({ width = 10 }) => {
	const height = width;

	return (
		<Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
			<G clipPath="url(#clip0_841_3184)">
				<Path
					d="M7.31851 12.1243L7.02458 16.2586C7.44512 16.2586 7.62725 16.0779 7.84566 15.861L9.8173 13.9767L13.9027 16.9686C14.652 17.3862 15.1799 17.1663 15.382 16.2793L18.0637 3.71353L18.0644 3.71279C18.3021 2.60517 17.6639 2.17205 16.9339 2.44377L1.17111 8.47863C0.0953332 8.89621 0.111622 9.49592 0.988235 9.76764L5.01814 11.0211L14.3788 5.16394C14.8193 4.87223 15.2199 5.03363 14.8904 5.32534L7.31851 12.1243Z"
					fill="black"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_841_3184">
					<Rect
						width="17.7692"
						height="17.7692"
						fill="white"
						transform="translate(0.346191 0.884521)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default Telegram;
