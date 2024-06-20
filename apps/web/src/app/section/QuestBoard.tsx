import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Web3FarmingQuestType } from '@aigo/api/sdk';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import QuestCard from './QuestCard';
import ReferralCode from './ReferralCode';
import ReferralHistory from './ReferralHistory';
import { questMetadataMap } from './shared';

import { showAppDownload } from '@/modals/ShowAppDownload';
import { appState } from '@/state/app';

const QuestBoard: FC = () => {
	const { web3FarmingProfile } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<View style={styles.bgLayer}>
				<Image
					src="/bg-layer.svg"
					alt="background layer"
					width={1204}
					height={958}
				/>
			</View>
			<View style={styles.innerContainer}>
				{web3FarmingProfile && (web3FarmingProfile.quests?.length || 0) > 0 ? (
					<View style={styles.questContainer}>
						{web3FarmingProfile.quests
							?.toSorted((questA, questB) => {
								return (
									new Date(questA?.createdAt).getMilliseconds() -
									new Date(questB?.createdAt).getMilliseconds()
								);
							})
							.filter(
								(quest) => quest?.type !== Web3FarmingQuestType.ConnectEmail,
							)
							.map((quest, index) => {
								const hide = quest?.type && questMetadataMap[quest?.type].hide;
								if (hide) return null;

								const description =
									quest?.type && questMetadataMap[quest?.type].description;
								const action =
									quest?.type && questMetadataMap[quest?.type].action;
								const check =
									quest?.type && questMetadataMap[quest?.type].check;
								return (
									<QuestCard
										order={index + 1}
										key={quest?.id}
										point={quest?.GOPoints || 0}
										type={quest?.type}
										description={description || ''}
										isVerified={quest?.completed}
										questId={quest?.id as string}
										onActionPress={action as never}
										onCheckPress={check as never}
									/>
								);
							})}
					</View>
				) : (
					<View style={styles.questContainer}>
						<QuestCard
							order={1}
							point={128}
							isVerified={false}
							description="Like our Post on X"
						/>
						<QuestCard
							order={2}
							point={128}
							isVerified={false}
							description="Retweet our Post on X"
						/>
						<QuestCard
							order={3}
							point={128}
							isVerified={false}
							description={`Download AiGO on iOS or Android`}
							onActionPress={showAppDownload}
						/>
						{/* <QuestCard
							order={4}
							point={128}
							description="Connect with X or Google"
						/> */}
					</View>
				)}
				<View style={styles.belowContainer}>
					<ReferralCode />
					<ReferralHistory />
				</View>
			</View>
		</View>
	);
};

export default QuestBoard;

const styles = StyleSheet.create({
	container: {
		maxWidth: 1248,
		backgroundColor: '#000',
		alignSelf: 'center',
		paddingHorizontal: 24,
		position: 'relative',
	},
	bgLayer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
	},
	innerContainer: {
		borderWidth: 1,
		borderColor: '#1f1f1f',
		borderRadius: 16,
		backgroundColor: '#141414',
		padding: 12,
		transform: [{ translateY: -40 }],
		gap: 36,
	},
	questContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
	},
	belowContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
});
