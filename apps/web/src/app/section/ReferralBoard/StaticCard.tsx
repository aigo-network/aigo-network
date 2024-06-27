import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { clashDisplay } from '@/utils/style';

interface Props {
	value: number;
	parameter: string;
	icon?: ReactNode;
	style?: StyleProp<ViewStyle>;
}

const StaticCard: FC<Props> = ({ value, parameter, icon, style }) => {
	return (
		<View style={[styles.container, style]}>
			{icon}
			<Text style={styles.value}>{value}</Text>
			<Text style={styles.parameter}>{parameter}</Text>
		</View>
	);
};

export default StaticCard;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	value: {
		marginTop: 12,
		fontFamily: clashDisplay.style.fontFamily,
		fontSize: 32,
		fontWeight: '500',
		lineHeight: 40,
	},
	parameter: {
		marginTop: 8,
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 12 * 0.06,
		color: '#707174',
		textAlign: 'center',
	},
});
