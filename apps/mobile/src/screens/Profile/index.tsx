import { ScrollView, StyleSheet, View } from 'react-native';
import SafeContainer from '@aigo/components/SafeContainer';
import ScreenHeader from 'components/ScreenHeader';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import Footer from './Footer';
import Header from './Header';
import Info from './Info';
import PartnerProgram from './Partner';
import Referral from './Referral';
import Settings from './Settings';
import Wallet from './Wallet';

export const ProfileScreen = () => {
	const { content, remoteConfig } = useSnapshot(appState);
	const profileContent = content.screens.profile;

	return (
		<View style={styles.container}>
			<SafeContainer>
				<ScreenHeader title={profileContent.title} />
				<ScrollView
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
				>
					<Header />
					{remoteConfig.nyamNyamCampaignActivated && <PartnerProgram />}
					<Info />
					<Wallet />
					<Settings />
					<Referral />
					<Footer />
				</ScrollView>
			</SafeContainer>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: defaultTheme.bgLight,
	},
	scrollContainer: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 100,
	},
});
