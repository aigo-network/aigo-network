import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import SafeContainer from '@aigo/components/SafeContainer';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import Footer from './Footer';
import Header from './Header';
import Info from './Info';
import PartnerProgram from './Partner';
import Referral from './Referral';
import Settings from './Settings';

export const ProfileScreen = () => {
	const { content, remoteConfig } = useSnapshot(appState);
	const profileContent = content.screens.profile;
	const { goBack } = useNavigation();

	return (
		<View style={styles.container}>
			<SafeContainer>
				<View style={styles.titleContainer}>
					<TouchableOpacity
						style={styles.backButton}
						hitSlop={14}
						onPress={goBack}
					>
						<LeftArrowIcon color={defaultTheme.textDark90} width={16} />
					</TouchableOpacity>
					<Text style={styles.title}>{profileContent.title}</Text>
				</View>

				<ScrollView
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
				>
					<Header />
					{remoteConfig.nyamNyamCampaignActivated && <PartnerProgram />}
					<Info />
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
	},
	backgroundImageLeft: {
		position: 'absolute',
		opacity: 0.5,
		top: 20,
		left: -280,
	},
	backgroundImageRight: {
		position: 'absolute',
		opacity: 0.5,
		top: -300,
		right: -400,
	},
	backgroundImageBottom: {
		position: 'absolute',
		opacity: 0.5,
		bottom: 0,
		right: -390,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: defaultTheme.textDark90,
	},
	backButton: {
		padding: 10,
	},
});
