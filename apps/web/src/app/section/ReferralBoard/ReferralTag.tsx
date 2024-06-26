import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	referralCode: string;
	style?: StyleProp<ViewStyle>;
}

const ReferralTag: FC<Props> = ({ referralCode, style }) => {
	return (
		<View style={[styles.container, style]}>
			<Text>{referralCode}</Text>
		</View>
	);
};

export default ReferralTag;

const styles = StyleSheet.create({
	container: {
		shadowColor: 'rgba(82, 199, 238, 0.2)',
		shadowRadius: 12,
		elevation: 6,
		borderWidth: 0.5,
		borderColor: '#858585',
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	code: {
		lineHeight: 28,
		marginLeft: 16,
	},
});
