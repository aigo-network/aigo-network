import type { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	value: ReactNode;
	parameter: string;
}

const StaticCard: FC<Props> = ({ value, parameter }) => {
	return (
		<View style={styles.container}>
			{value}
			<Text style={styles.parameter}>{parameter}</Text>
		</View>
	);
};

export default StaticCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1d1d1d',
		borderRadius: 10,
		width: 170,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	parameter: {
		fontSize: 12,
		color: 'rgba(251, 251, 251, 0.3)',
		textAlign: 'center',
	},
});
