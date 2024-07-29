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
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';
import { useSnapshot } from 'valtio';

import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';
import StartTrip from './StartTrip';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();
	const { bottom } = useSafeAreaInsets();
	const { appUser, content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	const { remoteConfig } = useSnapshot(appState);

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
				<Image
					style={styles.banner}
					source={require('assets/img/tada-banner.png')}
					resizeMethod="resize"
				/>
				<DailyCheckIn />
				<Invite />
				{/* <DailyMissions /> */}
			</ScrollView>

			{remoteConfig.enableMapFeature && <StartTrip />}
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
	banner: {
		maxWidth: '100%',
		height: 140,
		borderRadius: 20,
		overflow: 'hidden',
	},
	balanceContainer: {
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: defaultTheme.bgLight,
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
