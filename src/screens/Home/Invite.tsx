import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { sharedStyles, showInvitationCode } from './shared';

export const Invite = () => {
	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>Invite your friends</Text>
				<Text style={styles.descriptionText}>
					Receive
					<Text style={styles.pointText}> 10 GO/referral</Text> & earn 10% from
					their earning
				</Text>
			</View>
			<View style={styles.inviteContainer}>
				<Text style={styles.inviteCountText}>0 Referrals</Text>
				<TouchableOpacity
					style={styles.inviteButton}
					hitSlop={14}
					onPress={showInvitationCode}
				>
					<Text>Invite</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Invite;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	titleContainer: {
		flex: 1,
		gap: 8,
	},
	inviteCountText: {
		color: '#000',
		fontSize: 14,
	},
	inviteContainer: {
		gap: 10,
		alignItems: 'center',
	},
	descriptionText: {
		flex: 1,
		color: '#A9A9A9',
	},
	pointText: {
		color: '#714CFE',
	},
	inviteButton: {
		padding: 7,
		paddingHorizontal: 26,
		borderRadius: 20,
		backgroundColor: '#6740FF',
	},
});
