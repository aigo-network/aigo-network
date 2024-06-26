import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Parameter from '@aigo/components/icon/Parameter';
import { useSnapshot } from 'valtio';

import BoardLayout from '../BoardLayout';

import ReferralTag from './ReferralTag';
import StaticCard from './StaticCard';

import { appState } from '@/state/app';

const ReferralBoard: FC = () => {
	const { user } = useSnapshot(appState);

	return (
		<BoardLayout
			style={styles.container}
			title="REFERRAL"
			subTitle="More frens, more fun!"
		>
			<View style={styles.contentContainer}>
				<View style={styles.staticGroup}>
					<StaticCard
						value={
							<Text style={styles.goPoints}>
								{user?.GOPoints || 0} <Parameter />
							</Text>
						}
						parameter="GO Points"
					/>
					<StaticCard
						value={<Text style={styles.goPoints}>{12}</Text>}
						parameter="Succeeded Ref"
					/>
				</View>
				<Text style={styles.description}>
					<Text style={{ color: '#81ddfb' }}>+150 GO</Text> per Referral
				</Text>
				<View>
					<ReferralTag referralCode="AiGO92835e" />
				</View>
			</View>
		</BoardLayout>
	);
};

export default ReferralBoard;

const styles = StyleSheet.create({
	container: {
		maxWidth: 500,
		alignItems: 'center',
		marginHorizontal: 25,
	},
	contentContainer: {
		marginTop: 24,
		width: '100%',
		maxWidth: 410,
		paddingHorizontal: 25,
		marginBottom: 80,
	},
	staticGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	goPoints: {
		flexDirection: 'row',
		fontSize: 20,
		fontWeight: '600',
	},
	description: {
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 28,
		marginTop: 20,
		marginBottom: 12,
	},
});
