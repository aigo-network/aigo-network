import type { FC } from 'react';
import { Fragment, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Web3FarmingQuest } from '@aigo/api/sdk';
import { useSnapshot } from 'valtio';

import { getAction, getIcon } from '../shared';

import MissionTag from './MissionTag';

import BoardLayout from '@/components/BoardLayout';
import { appState } from '@/state/app';

type Props = {
	isMobile?: boolean;
};

const MissionBoard: FC<Props> = ({ isMobile }) => {
	const { user, web3FarmingProfile } = useSnapshot(appState);
	const questLists = useMemo(() => {
		const completes = [];
		const incompletes = [];

		for (const quest of web3FarmingProfile?.quests || []) {
			if (quest?.completed) {
				completes.push(quest);
			} else {
				incompletes.push(quest);
			}
		}

		return [incompletes, completes];
	}, [web3FarmingProfile?.quests]);

	return (
		<BoardLayout
			style={styles.container}
			contentContainerStyle={[
				styles.contentContainer,
				isMobile && styles.mobileContainer,
			]}
			title="Quests"
			subTitle="COMPLETE ALL THE TASKS BELOW TO GAIN MORE GO POINTS"
		>
			<View style={styles.missionGroup}>
				{questLists.map((list, i) => {
					return (
						<Fragment key={i}>
							{list
								.sort(
									(quest01, quest02) =>
										new Date(quest01?.createdAt).getTime() -
										new Date(quest02?.createdAt).getTime(),
								)
								.map((quest) => {
									const { Component, props } = getIcon(quest?.type);

									return (
										<MissionTag
											key={quest?.id}
											isMobile={isMobile}
											item={quest as Web3FarmingQuest}
											user={user as never}
											farmingProfile={web3FarmingProfile as never}
											prefix={Component && <Component {...props} />}
											onPress={getAction(quest)}
										/>
									);
								})}
						</Fragment>
					);
				})}
			</View>
		</BoardLayout>
	);
};

export default MissionBoard;

const styles = StyleSheet.create({
	container: {
		flex: 2,
		minWidth: 320,
	},
	mobileContainer: {
		minWidth: 0,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 24,
	},
	missionGroup: {
		gap: 16,
		marginTop: 32,
	},
});
