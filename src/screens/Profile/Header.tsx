import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appState } from 'state/app';
import { defaultAvatar } from 'utils/misc';
import { useSnapshot } from 'valtio';

export const Header = () => {
	const { appUser } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: appUser?.imageUrl || defaultAvatar }}
					/>
				</View>
				<Text style={styles.nameText}>{appUser?.name || 'Anonymous'}</Text>
			</View>
			<View style={styles.balanceContainer}>
				<View style={styles.balanceBgContainer}>
					<Image
						style={[styles.iconBg, styles.balanceIconTop]}
						source={require('assets/img/aigo-bg-icon.png')}
					/>
					<Image
						style={[styles.iconBg, styles.balanceIconBottom]}
						source={require('assets/img/aigo-bg-icon.png')}
					/>
				</View>
				<View style={styles.balanceTextContainer}>
					<Text style={styles.balanceTitleText}>Total balance</Text>
					<Text style={styles.balanceAmountText}>
						{appUser?.GOPoints || 0} GO
					</Text>
				</View>
				<TouchableOpacity style={styles.historyButton}>
					<Text>View history</Text>
				</TouchableOpacity>
			</View>
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
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 0,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	nameText: {
		fontSize: 24,
		color: '#000',
	},
	balanceContainer: {
		backgroundColor: '#6740ff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 18,
		paddingBottom: 14,
		borderRadius: 30,
	},
	balanceTextContainer: {
		gap: 6,
	},
	balanceTitleText: {
		fontSize: 16,
		color: '#C8C8C8',
	},
	balanceAmountText: {
		fontSize: 34,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	historyButton: {
		borderWidth: 1,
		borderColor: '#fff',
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
	},
	balanceBgContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
		borderRadius: 30,
	},
	balanceIconTop: {
		position: 'absolute',
		right: -70,
		top: -70,
	},
	balanceIconBottom: {
		position: 'absolute',
		left: -40,
		bottom: -140,
	},
	iconBg: {
		width: 200,
		height: 190,
	},
});
