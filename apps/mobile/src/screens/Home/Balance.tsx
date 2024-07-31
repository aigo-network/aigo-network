import { ImageBackground, StyleSheet, Text } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export const Balance = () => {
	const { appUser, content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	return (
		<ImageBackground
			source={require('/assets/img/balance-ic.png')}
			imageStyle={styles.backgroundImage}
			style={styles.container}
		>
			<Text style={styles.balanceText}>
				{homeContent.headerSection.balanceTitle}
			</Text>

			<Text style={styles.balanceAmount}>{`${appUser?.GOPoints || 0} GO`}</Text>
		</ImageBackground>
	);
};

export default Balance;

const styles = StyleSheet.create({
	container: {
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: defaultTheme.gray10,
		shadowColor: defaultTheme.textDark100,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 5,
		objectFit: 'cover',
	},
	backgroundImage: {
		width: 250,
		height: 230,
		left: 185,
		top: -30,
		transform: [{ rotate: '-10deg' }],
	},
	balanceText: {
		fontSize: 17,
		color: defaultTheme.textDark90,
	},
	balanceAmount: {
		fontFamily: 'DMSans',
		fontSize: 26,
		fontWeight: '700',
		color: defaultTheme.textDark90,
	},
});
