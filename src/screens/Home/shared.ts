import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 18,
		paddingBottom: 22,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2,
		gap: 14,
	},
});
