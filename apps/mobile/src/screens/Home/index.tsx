import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'components/Button';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';

import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();
	const { bottom } = useSafeAreaInsets();

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
				<Image
					style={styles.banner}
					source={require('assets/img/tada-banner.png')}
					resizeMethod="resize"
				/>
				<DailyCheckIn />
				<Invite />
			</ScrollView>
			<Button
				style={styles.button}
				prefix={
					<Image
						source={require('assets/img/bike-ic.png')}
						style={styles.prefix}
					/>
				}
			>
				<Text style={styles.title}>Start your trip now</Text>
			</Button>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
		gap: 16,
	},
	mainContainer: {
		flex: 1,
	},
	mainContentContainer: {
		flexGrow: 1,
		paddingHorizontal: 16,
		gap: 16,
	},
	banner: {
		maxWidth: '100%',
		height: 140,
		borderRadius: 20,
		overflow: 'hidden',
	},
	button: {
		backgroundColor: defaultTheme.textDark90,
		marginHorizontal: 16,
		paddingVertical: 16,
		borderRadius: 50,
		gap: 10,
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
