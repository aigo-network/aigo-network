import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlaceIcon from '@aigo/components/icon/PlaceIcon';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { defaultAvatar } from 'utils/misc';
import { useSnapshot } from 'valtio';

export const Header = () => {
	const { navigate } = useNavigation();
	const insets = useSafeAreaInsets();
	const { appUser, content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	return (
		<View style={[styles.container, { paddingTop: insets.top + 16 }]}>
			<View style={styles.infoContainer}>
				<View style={styles.nameContainer}>
					<Text
						style={styles.name}
					>{`${homeContent.headerSection.welcomePrefix}, ${appUser?.name}👋`}</Text>
					<View style={styles.cityContainer}>
						<PlaceIcon width={12} color={defaultTheme.textDark50} />
						<Text style={styles.city}>{appUser?.city}</Text>
					</View>
				</View>

				<TouchableOpacity onPress={() => navigate('Profile')}>
					<Image
						style={styles.avatar}
						source={{ uri: appUser?.imageUrl || defaultAvatar }}
					/>
				</TouchableOpacity>
			</View>

			<ImageBackground
				source={require('/assets/img/balance-bg.png')}
				style={styles.balanceContainer}
			>
				<Text style={styles.balanceText}>
					{homeContent.headerSection.balanceTitle}
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
		paddingHorizontal: 16,
		gap: 24,
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	nameContainer: {
		gap: 6,
	},
	name: {
		fontSize: 20,
		color: defaultTheme.textDark80,
		fontWeight: '600',
	},
	cityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	city: {
		fontSize: 12,
		fontWeight: '500',
		color: defaultTheme.textDark50,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	balanceContainer: {
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		overflow: 'hidden',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: -1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: -2,
		objectFit: 'cover',
	},
	balanceText: {
		fontSize: 17,
		color: defaultTheme.textLight,
	},
	balanceAmount: {
		fontFamily: 'DMSans',
		fontSize: 26,
		fontWeight: '700',
		color: defaultTheme.textLight,
	},
});
