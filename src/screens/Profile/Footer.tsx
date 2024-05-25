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
import { logOut } from 'utils/auth';
import { config } from 'utils/config';

import { showDeleteUserConfirm } from './shared';

export const Footer = () => {
	const { reset } = useNavigation();

	const handlePressFollowTwitter = () => {
		Linking.openURL('https://x.com/AIGO_Network');
	};

	const handlePressJoinTelegram = () => {
		Linking.openURL('https://t.me/aigo_network');
	};

	const handleLogOut = () => {
		const logout = () => {
			reset({
				index: 1,
				routes: [{ name: 'Splash' }],
			});
			logOut();
		};

		const deleteUser = async () => {
			await graphqlClient.deleteUser();
		};
		showDeleteUserConfirm({
			logout,
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

			<TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
				<LogOut width={24} />
				<Text style={styles.logOutText}>Log out</Text>
			</TouchableOpacity>
			<Text style={styles.version}>Version {config.version}</Text>
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
	logOutButton: {
		flexDirection: 'row',
		gap: 6,
		marginTop: 30,
		padding: 16,
		alignSelf: 'center',
	},
	logOutText: {
		fontSize: 18,
		color: '#D84A4A',
	},
	version: {
		textAlign: 'center',
		color: '#4d4d4d',
	},
});
