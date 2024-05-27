import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import LogOut from 'components/icon/LogOut';
import Telegram from 'components/icon/Telegram';
import Twitter from 'components/icon/Twitter';
import { appState } from 'state/app';
import { logOut } from 'utils/auth';
import { config } from 'utils/config';
import { useSnapshot } from 'valtio';

import { showDeleteUserConfirm, showLogOutConfirm } from './shared';

export const Footer = () => {
	const { version, buildNumber } = useSnapshot(appState);
	const { reset } = useNavigation();

	const handlePressFollowTwitter = () => {
		Linking.openURL('https://x.com/AIGO_Network');
	};

	const handlePressJoinTelegram = () => {
		Linking.openURL('https://t.me/aigo_network');
	};

	const logOutAndResetRoute = () => {
		logOut();
		reset({
			index: 1,
			routes: [{ name: 'Splash' }],
		});
	};

	const handleLogOut = () => {
		showLogOutConfirm({
			logout: logOutAndResetRoute,
		});
	};

	const handleDeleteAccount = () => {
		const deleteUser = async () => {
			await graphqlClient.deleteUser();
		};
		showDeleteUserConfirm({
			logout: logOutAndResetRoute,
			deleteUser,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.aboutContainer}>
				<Text style={styles.title}>About AiGO Network</Text>
				<View style={styles.socialContainer}>
					<TouchableOpacity
						style={styles.socialButton}
						onPress={handlePressFollowTwitter}
						hitSlop={1}
					>
						<Twitter width={20} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.socialButton}
						onPress={handlePressJoinTelegram}
						hitSlop={1}
					>
						<Telegram width={20} />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.logOutGroup}>
				<TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
					<LogOut width={24} />
					<Text style={styles.logOutText}>Log out</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.logOutButton}
					onPress={handleDeleteAccount}
				>
					<Text style={styles.deleteAccountText}>Delete account</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.version}>
				Version {version} ({buildNumber})
			</Text>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		marginBottom: 50,
	},
	aboutContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	socialContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	socialButton: {
		width: 40,
		height: 40,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
	},
	logOutGroup: {
		marginTop: 30,
		paddingTop: 16,
		paddingBottom: 8,
		gap: 10,
	},
	logOutButton: {
		flexDirection: 'row',
		gap: 6,
		alignSelf: 'center',
	},
	logOutText: {
		fontSize: 18,
		color: '#D84A4A',
	},
	deleteAccountText: {
		fontSize: 18,
		color: '#CCCCCC',
		marginTop: 24,
	},
	version: {
		textAlign: 'center',
		color: '#4d4d4d',
	},
});
