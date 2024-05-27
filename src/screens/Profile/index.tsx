import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeftArrowIcon from 'components/icon/LeftArrowIcon';
import SafeContainer from 'components/SafeContainer';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import Footer from './Footer';
import Header from './Header';
import Info from './Info';
import Referral from './Referral';

export const ProfileScreen = () => {
	const profileContent = useSnapshot(appState.content.screens.profile);
	const { goBack } = useNavigation();

	return (
		<View style={styles.container}>
			<Image
				style={styles.backgroundImageLeft}
				source={require('assets/img/background-logo.png')}
			/>
			<Image
				style={styles.backgroundImageRight}
				source={require('assets/img/background-logo.png')}
			/>
			<Image
				style={styles.backgroundImageBottom}
				source={require('assets/img/background-logo.png')}
			/>
			<SafeContainer>
				<View style={styles.titleContainer}>
					<TouchableOpacity
						style={styles.backButton}
						hitSlop={14}
						onPress={goBack}
					>
						<LeftArrowIcon color={'#000'} width={16} />
					</TouchableOpacity>
					<Text style={styles.title}>{profileContent.title}</Text>
				</View>

				<ScrollView
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
				>
					<Header />
					<Info />
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
		backgroundColor: '#F7F7F7',
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
		color: '#000',
	},
	backButton: {
		padding: 10,
	},
});
