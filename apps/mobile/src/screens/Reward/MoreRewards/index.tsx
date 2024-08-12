import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';

import Item from './Item';

const MoreRewards = () => {
	const [containerWidth, setContainerWidth] = useState(0);
	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		setContainerWidth(nativeEvent.layout.width);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🎁 More rewards from AiGO</Text>
			<View style={styles.contentContainer} onLayout={handleLayoutChange}>
				{Array.from({ length: 5 })
					.fill(() => 0)
					.map((_number, index) => (
						<Item key={index} containerWidth={containerWidth} />
					))}
			</View>
		</View>
	);
};

export default MoreRewards;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		marginTop: 40,
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
		paddingLeft: 16,
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: 4,
	},
});
