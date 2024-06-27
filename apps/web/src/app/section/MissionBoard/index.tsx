import type { FC } from 'react';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Web3FarmingQuestType } from '@aigo/api/sdk';
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
				{user &&
					web3FarmingProfile?.quests
						?.filter((quest) => !quest?.completed)
						?.map((quest) => {
							const { id, type, description, title, GOPoints } = quest || {};
							const onPress = quest ? getAction(quest) : undefined;
							const { Component, props } = (type && getIcon(type)) || {};
							return (
								<MissionTag
									key={id}
									id={id || ''}
									type={type as Web3FarmingQuestType}
									description={description || title || ''}
									point={GOPoints || 0}
									prefix={Component && <Component {...props} />}
									onPress={onPress}
								/>
							);
						})}
				{user &&
					web3FarmingProfile?.quests
						?.filter((quest) => quest?.completed)
						?.map((quest) => {
							const { id, type, description } = quest || {};
							const { Component, props } = (type && getIcon(type)) || {};
							return (
								<MissionTag
									key={id}
									type={type as Web3FarmingQuestType}
									id={id || ''}
									description={description || ''}
									point={quest?.GOPoints || 0}
									prefix={Component && <Component {...props} />}
									verified
								/>
							);
						})}

				{!user && (
					<Fragment>
						<MissionTag
							id=""
							description="Like AiGO post on Twitter"
							point={60}
						/>
						<MissionTag
							id=""
							description="Like AiGO post on Twitter"
							point={60}
							verified
						/>
					</Fragment>
				)}
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
