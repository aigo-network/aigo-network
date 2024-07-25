import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { config } from '@aigo/config';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import { sharedStyles, showInvitationCode } from './shared';

export const Invite = () => {
	const { content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>
					{homeContent.inviteSection.title}
				</Text>
				<Text style={styles.descriptionText}>
					{homeContent.inviteSection.descriptionPrefix}
					<Text style={styles.pointText}>
						{' '}
						{config.activity.InviteFriend.points} GO
						{homeContent.inviteSection.referral}
					</Text>{' '}
					{homeContent.inviteSection.descriptionSuffix}
				</Text>
			</View>
			<View style={styles.inviteContainer}>
				<Text style={styles.inviteCountText}>
					0 {homeContent.inviteSection.referralCountSuffix}
				</Text>
				<TouchableOpacity
					style={styles.inviteButton}
					hitSlop={14}
					onPress={showInvitationCode}
				>
					<Text style={{ fontSize: 13 }}>
						{homeContent.inviteSection.inviteButton}
					</Text>
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
		color: defaultTheme.textDark80,
		fontSize: 14,
	},
	inviteContainer: {
		gap: 10,
		alignItems: 'center',
	},
	descriptionText: {
		flex: 1,
		color: defaultTheme.textDark80,
	},
	pointText: {
		color: defaultTheme.cta100,
	},
	inviteButton: {
		padding: 7,
		paddingHorizontal: 26,
		borderRadius: 20,
		backgroundColor: defaultTheme.cta100,
	},
});
