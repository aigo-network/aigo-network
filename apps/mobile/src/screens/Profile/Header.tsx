import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { defaultAvatar } from 'utils/misc';
import { useSnapshot } from 'valtio';

export const Header = () => {
	const { content, appUser } = useSnapshot(appState);
	const profileContent = content.screens.profile;

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: appUser?.imageUrl || defaultAvatar }}
					/>
				</View>
				<Text style={styles.nameText}>
					{appUser?.name || profileContent.unknownUsername}
				</Text>
			</View>
			<ImageBackground
				source={require('/assets/img/balance-ic.png')}
				imageStyle={styles.backgroundImage}
				style={styles.balanceContainer}
			>
				<Text style={styles.balanceText}>
					{profileContent.totalBalanceTitle}
				</Text>

				<Text
					style={styles.balanceAmount}
				>{`${appUser?.GOPoints || 0} GO`}</Text>
			</ImageBackground>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		gap: 14,
	},
	infoContainer: {
		alignItems: 'center',
		gap: 14,
	},
	avatarContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	nameText: {
		fontSize: 24,
		color: defaultTheme.textDark90,
	},
	balanceContainer: {
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
