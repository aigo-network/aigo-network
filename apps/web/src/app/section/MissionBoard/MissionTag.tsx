import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { Web3FarmingQuestType } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Tick from '@aigo/components/icon/Tick';

import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { appActions } from '@/state/app';
import { tracker } from '@/utils/analytic';
import { clashDisplay } from '@/utils/style';

interface Props {
	id: string;
	description: string;
	point: number;
	type?: Web3FarmingQuestType;
	prefix?: ReactNode;
	verified?: boolean;
	onPress?: () => void;
}

const MissionTag: FC<Props> = ({
	id,
	type,
	description,
	point,
	prefix,
	verified = false,
	onPress,
}) => {
	const [hovered, setHovered] = useState(false);
	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [innerVerified, setInnerVerified] = useState(verified);
	const onHover = (isHovered: boolean) => {
		if (verified) return;

		setHovered(isHovered);
	};
	const onVerify = async () => {
		setLoading(true);
		try {
			const { web3FarmingVerifyQuestAndClaimPoints } =
				await graphqlClient.web3FarmingVerifyQuestAndClaimPoints({
					questId: id,
				});
			appActions.queryAndUpdateGOPoints();
			tracker.logEvents('verify_quest', {
				questId: id,
				questType: type,
			});

			setInnerVerified(
				web3FarmingVerifyQuestAndClaimPoints?.completed || false,
			);
		} catch (error) {
			console.log(JSON.stringify(error, null, 2));
		}
		setLoading(false);
	};
	const handlePress = () => {
		onPress?.();
		setCompleted(true);
	};

	return (
		<View style={{ opacity: verified ? 0.4 : 1 }}>
			<Tag disabled={verified} onHover={onHover} onPress={handlePress}>
				<View style={[styles.container, verified && { opacity: 0.25 }]}>
					{prefix}
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}>{description}</Text>
						<Text style={styles.point}>{`+${point} GO`}</Text>
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
