import { StyleSheet } from 'react-native';
import { defaultTheme } from 'utils/global';

export const sharedStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	contentContainer: {
		paddingVertical: 24,
		paddingHorizontal: 16,
	},
	emptyRewardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 150,
	},
	boldText: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '700',
		color: defaultTheme.textDark80,
	},
	normalText: {
		marginTop: 10,
		fontSize: 16,
		lineHeight: 24,
		color: defaultTheme.textDark60,
		textAlign: 'center',
	},
	goToRewardsButton: {
		marginTop: 50,
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '800',
		color: defaultTheme.cta100,
	},
});
