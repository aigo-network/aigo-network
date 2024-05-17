import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
	activeIndex: number;
	numberOfItems: number;
	style?: ViewStyle;
}

export const Indicator: FC<Props> = ({ activeIndex, numberOfItems, style }) => {
	return (
		<View style={[styles.container, style]}>
			{Array(numberOfItems)
				.fill(0)
				.map((_, idx) => {
					const isActive = idx + 1 === activeIndex;
					return (
						<View
							key={idx}
							style={
								isActive ? styles.activeIndicator : styles.inactiveIndicator
							}
						/>
					);
				})}
		</View>
	);
};

export default Indicator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	inactiveIndicator: {
		width: 12,
		height: 6,
		backgroundColor: '#969aff',
		borderRadius: 32,
	},
	activeIndicator: {
		width: 40,
		height: 8,
		backgroundColor: '#fff',
		borderRadius: 32,
	},
});
