import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { Web3FarmingQuest } from '@aigo/api/graphql';
import { Web3FarmingQuestType } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import type { User, Web3FarmingProfile } from '@aigo/api/sdk';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Tick from '@aigo/components/icon/Tick';

import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { showInformation } from '@/modals/Information';
import { showImportCode } from '@/modals/ShowImportCode';
import { appActions } from '@/state/app';
import { tracker } from '@/utils/analytic';
import { signInWithTwitter } from '@/utils/auth';
import { clashDisplay } from '@/utils/style';

interface Props {
	isMobile?: boolean;
	user?: User;
	farmingProfile?: Web3FarmingProfile;
	item: Web3FarmingQuest;
	prefix?: ReactNode;
	onPress?: () => void;
}

const MissionTag: FC<Props> = ({
	isMobile,
	user,
	farmingProfile,
	item,
	prefix,
	onPress,
}) => {
	const [hovered, setHovered] = useState(false);
	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [innerVerified, setInnerVerified] = useState(item.completed || false);

	const onHover = (isHovered: boolean) => {
		if (innerVerified) return;
		setHovered(isHovered);
	};

	const onVerify = async () => {
		switch (item.type) {
			case Web3FarmingQuestType.DownloadApp:
				showInformation(
					'Verify download AiGO',
					'Nice! You are now an AiGO member, your quest is verifying and your points will be distribute when it’s complete!',
				);
				break;
			default:
				setLoading(true);
				try {
					const { web3FarmingVerifyQuestAndClaimPoints } =
						await graphqlClient.web3FarmingVerifyQuestAndClaimPoints({
							questId: item.id,
						});
					appActions.queryAndUpdateGOPoints();
					tracker.logEvents('verify_quest', {
						questId: item.id,
						questType: item.type,
					});

					setInnerVerified(
						web3FarmingVerifyQuestAndClaimPoints?.completed || false,
					);
				} catch (error) {
					console.log(JSON.stringify(error, null, 2));
				}
				setLoading(false);
		}
	};
	const handlePress = () => {
		if (farmingProfile?.id) {
			onPress?.();
			setCompleted(true);
		} else if (user?.id) {
			showImportCode();
		} else {
			signInWithTwitter();
		}
	};

	return (
		<View style={{ opacity: innerVerified ? 0.4 : 1 }}>
			<Tag disabled={innerVerified} onHover={onHover} onPress={handlePress}>
				<View style={[styles.container, innerVerified && { opacity: 0.25 }]}>
					{prefix}
					<View style={styles.descriptionContainer}>
						<Text style={[styles.description, isMobile && styles.mobileDesc]}>
							{item.title}
						</Text>
						<Text style={styles.point}>{`+${item.GOPoints} GO`}</Text>
					</View>
					{innerVerified ? (
						<View style={styles.tickBackground}>
							<Tick width={12} color="#000000" />
						</View>
					) : completed ? (
						<Button style={styles.checkBtn} onPress={onVerify}>
							{loading ? (
								<ActivityIndicator color="#ffffff" />
							) : (
								<Text style={styles.checkText}>Verify</Text>
							)}
						</Button>
					) : (
						<View style={styles.icon}>
							<ChevronUp width={24} color={hovered ? '#ffffff' : '#999999'} />
						</View>
					)}
				</View>
			</Tag>
		</View>
	);
};

export default MissionTag;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 18,
		paddingVertical: 16,
		pointerEvents: 'none',
	},
	descriptionContainer: {
		flex: 1,
		paddingHorizontal: 12,
	},
	description: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: '500',
	},
	mobileDesc: {
		fontSize: 18,
	},
	point: {
		fontWeight: '500',
		lineHeight: 20,
		color: '#81ddfb',
	},
	icon: {
		transform: [{ rotate: '90deg' }],
	},
	checkBtn: {
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 6,
		backgroundColor: '#81ddfb',
		pointerEvents: 'box-only',
	},
	checkText: {
		fontFamily: clashDisplay.style.fontFamily,
		fontSize: 16,
		fontWeight: '500',
		color: '#000000',
	},
	tickBackground: {
		borderRadius: 10,
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#82ddfb',
	},
});
