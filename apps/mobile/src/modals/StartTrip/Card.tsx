import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
	title: string;
	style?: StyleProp<ViewStyle>;
	chosen?: boolean;
};

export const Card: FC<Props> = ({ title, style, chosen }) => {
	return (
		<TouchableWithoutFeedback>
			<View
				style={[styles.container, chosen && styles.highlightedContainer, style]}
			>
				<Text style={[styles.title, chosen && styles.highlightedTitle]}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		paddingHorizontal: 24,
		borderWidth: 1,
		backgroundColor: '#F1F2F3',
		borderColor: '#F1F2F3',
		borderRadius: 12,
	},
	highlightedContainer: {
		backgroundColor: '#EBF9FF',
		borderColor: '#34C3F4',
	},
	title: {
		fontSize: 15,
		lineHeight: 24,
		color: '#171717',
		textAlign: 'center',
	},
	highlightedTitle: {
		fontSize: 15,
		fontWeight: '500',
		color: '#34C3F4',
	},
});
