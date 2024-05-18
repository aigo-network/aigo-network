import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlaceIcon from 'components/icon/PlaceIcon';
import { appState } from 'state/app';
import { defaultAvatar } from 'utils/misc';
import { useSnapshot } from 'valtio';

export const Header = () => {
	const insets = useSafeAreaInsets();
	const { appUser } = useSnapshot(appState);

	return (
		<View style={[styles.container, { paddingTop: insets.top + 16 }]}>
			<View style={styles.infoContainer}>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>{`Hey ${appUser?.name}👋`}</Text>
					<View style={styles.cityContainer}>
						<PlaceIcon width={12} />
						<Text style={styles.city}>{appUser?.city}</Text>
					</View>
				</View>

				<Image
					style={styles.avatar}
					source={{ uri: appUser?.imageUrl || defaultAvatar }}
				/>
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
				<Text style={styles.balanceText}>Balance</Text>
				<View>
					<Text
						style={styles.balanceAmount}
					>{`${appUser?.GOPoints || 0} GO`}</Text>
				</View>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#6740ff',
		paddingHorizontal: 16,
		paddingBottom: 50,
		marginBottom: 40,
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
	},
	cityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	city: {
		fontSize: 12,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	balanceContainer: {
		backgroundColor: '#6740ff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 16,
		position: 'absolute',
		bottom: -30,
		left: 16,
		right: 16,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: -1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: -2,
	},
	balanceText: {
		fontSize: 17,
		color: '#A0FA82',
	},
	balanceAmount: {
		fontSize: 26,
	},
	balanceBgContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
		borderRadius: 20,
	},
	balanceIconTop: {
		position: 'absolute',
		right: -70,
		top: -70,
	},
	balanceIconBottom: {
		position: 'absolute',
		left: -40,
		bottom: -120,
	},
	iconBg: {
		width: 167,
		height: 157,
	},
});