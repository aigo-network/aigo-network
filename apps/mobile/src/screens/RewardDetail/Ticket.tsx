import type { FC } from 'react';
import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';
import Copy from '@aigo/components/icon/Copy';
import { rewardState } from 'state/reward';
import { defaultTheme } from 'utils/global';
import { RewardStatus } from 'utils/reward';
import { useSnapshot } from 'valtio';

const ticketHeight = 112;
const statusMap = {
	[RewardStatus.ACTIVE]: 'Available',
	[RewardStatus.USED]: 'Used',
	[RewardStatus.EXPIRED]: 'Expired',
};

interface Props {
	rewardStatus: RewardStatus;
	rewardId: string;
}

const Ticket: FC<Props> = ({ rewardStatus, rewardId }) => {
	const { redeemedRewards } = useSnapshot(rewardState);
	const reward = redeemedRewards?.find((reward) => reward.id === rewardId);
	const isActive = rewardStatus === RewardStatus.ACTIVE;
	const ticketHighlightColor = isActive ? '#2BD265' : defaultTheme.textDark20;

	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<Svg
					width="32"
					height={ticketHeight}
					viewBox="0 0 32 112"
					fill="none"
					style={styles.svg}
				>
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0 16C0 7.16344 7.16344 0 16 0H32V112H16C7.16344 112 0 104.837 0 96V91C0.79565 91 1.55871 90.5786 2.12132 89.8284C2.68393 89.0783 3 88.0609 3 87C3 85.9391 2.68393 84.9217 2.12132 84.1716C1.55871 83.4214 0.795649 83 0 83V78C0.79565 78 1.55871 77.5786 2.12132 76.8284C2.68393 76.0783 3 75.0609 3 74C3 72.9391 2.68393 71.9217 2.12132 71.1716C1.55871 70.4214 0.795649 70 0 70V65C0.79565 65 1.55871 64.5786 2.12132 63.8284C2.68393 63.0783 3 62.0609 3 61C3 59.9391 2.68393 58.9217 2.12132 58.1716C1.55871 57.4214 0.795649 57 0 57V52C0.79565 52 1.55871 51.5786 2.12132 50.8284C2.68393 50.0783 3 49.0609 3 48C3 46.9391 2.68393 45.9217 2.12132 45.1716C1.55871 44.4214 0.795649 44 0 44V39C0.79565 39 1.55871 38.5786 2.12132 37.8284C2.68393 37.0783 3 36.0609 3 35C3 33.9391 2.68393 32.9217 2.12132 32.1716C1.55871 31.4214 0.795649 31 0 31V26C0.79565 26 1.55871 25.5786 2.12132 24.8284C2.68393 24.0783 3 23.0609 3 22C3 20.9391 2.68393 19.9217 2.12132 19.1716C1.55871 18.4214 0.795649 18 0 18V16Z"
						fill={ticketHighlightColor}
					/>
				</Svg>
				<View style={styles.rewardStatus}>
					<Text style={styles.statusText}>{statusMap[rewardStatus]}</Text>
				</View>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>🎁 Your reward</Text>
				<View style={styles.codeContainer}>
					<TouchableOpacity
						hitSlop={10}
						onPress={() => Linking.openURL(reward?.link || '')}
					>
						<Text style={styles.code}>{reward?.link}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						hitSlop={10}
						onPress={() => navigator.clipboard.writeText(reward?.link || '')}
					>
						<View style={styles.copyButton}>
							<Copy color={defaultTheme.textDark90} width={12} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Ticket;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 16,
		marginTop: 16,
		marginBottom: 8,
		backgroundColor: defaultTheme.bgLight,
		elevation: 5,
		shadowColor: defaultTheme.textDark100,
		shadowOpacity: 0.1,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},
	svgContainer: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	svg: {
		elevation: 3,
	},
	rewardStatus: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: ticketHeight,
		height: 32,
		transform: [{ rotate: '270deg' }, { translateX: -40 }],
		justifyContent: 'center',
	},
	statusText: {
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	infoContainer: {
		height: ticketHeight,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		lineHeight: 22,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark70,
	},
	codeContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 12,
	},
	code: {
		lineHeight: 24,
		fontWeight: '700',
		letterSpacing: -0.3,
		textDecorationLine: 'underline',
		color: defaultTheme.cta100,
	},
	copyButton: {
		padding: 10,
		borderRadius: 26,
		backgroundColor: defaultTheme.gray20,
	},
});
