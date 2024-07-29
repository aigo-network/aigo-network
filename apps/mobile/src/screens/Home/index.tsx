import {
	Image,
	ImageBackground,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@aigo/components/Button';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';
import { useSnapshot } from 'valtio';

import ActiveBanners from './ActiveBanners';
import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();
	const { bottom } = useSafeAreaInsets();
	const { navigate } = useNavigation();
	const { appUser, content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	const { remoteConfig } = useSnapshot(appState);

	const handleOpenMap = () => {
		navigate('Map');
	};

	return (
		<View
			style={[
				styles.container,
				{ paddingBottom: Platform.OS === 'android' ? 30 : bottom },
			]}
		>
			<Header />
			<ScrollView
				style={styles.mainContainer}
				contentContainerStyle={styles.mainContentContainer}
			>
				{/* <Social /> */}
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
				<ActiveBanners />
				<DailyCheckIn />
				<Invite />
				{/* <DailyMissions /> */}
			</ScrollView>
			{remoteConfig.enableMapFeature && (
				<Button
					style={styles.button}
					prefix={
						<Image
							source={require('assets/img/bike-ic.png')}
							style={styles.prefix}
						/>
					}
					onPress={handleOpenMap}
				>
					<Text style={styles.title}>Start your trip now</Text>
				</Button>
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
		gap: 16,
		position: 'relative',
	},
	mainContainer: {
		flex: 1,
	},
	mainContentContainer: {
		flexGrow: 1,
		paddingHorizontal: 16,
		paddingBottom: 100,
		gap: 16,
	},
	balanceContainer: {
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: defaultTheme.textDark100,
		shadowColor: defaultTheme.textDark100,
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
	button: {
		backgroundColor: defaultTheme.textDark90,
		marginHorizontal: 16,
		paddingVertical: 16,
		borderRadius: 50,
		gap: 10,
		position: 'absolute',
		bottom: 30,
		left: 0,
		right: 0,
		shadowColor: '#000000',
		shadowOpacity: 0.32,
		shadowRadius: 12,
		elevation: 8,
	},
	prefix: {
		width: 24,
		objectFit: 'contain',
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
	},
});
