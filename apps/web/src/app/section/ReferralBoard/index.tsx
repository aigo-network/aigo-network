import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import BoardLayout from '../BoardLayout';

import ReferralTag from './ReferralTag';
import StaticCard from './StaticCard';

import { appState } from '@/state/app';
import { righteous } from '@/utils/style';

const ReferralBoard: FC = () => {
	const { user, web3FarmingProfile } = useSnapshot(appState);

	return (
		<BoardLayout
			style={styles.container}
			title="REFERRAL"
			subTitle="MORE FRIENDS, MORE FUN, MORE GO POINTS!"
		>
			<View style={styles.contentContainer}>
				<View style={styles.staticGroup}>
					<StaticCard
						style={styles.staticCard}
						value={user?.GOPoints || 0}
						parameter="# OF GO POINT"
						icon={
							<Image
								src="/diamond-img.png"
								alt="diamond image"
								width={32}
								height={32}
							/>
						}
					/>
					<View style={styles.separateLine} />
					<StaticCard
						style={styles.staticCard}
						value={12}
						parameter="SUCCESSFUL REF"
						icon={
							<Image
								src="/shake-hand-img.png"
								alt="shake hand image"
								width={32}
								height={32}
							/>
						}
					/>
				</View>
				<LinearGradient
					colors={['rgba(129, 221, 251, 0.25)', 'rgba(98, 91, 246, 0.25)']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.descriptionContainer}
				>
					<Text style={styles.description}>
						<Text style={{ color: '#81ddfb' }}>+150</Text> GO POINTS / REFERRAL
					</Text>
				</LinearGradient>
				<View style={styles.referralCodeContainer}>
					{web3FarmingProfile?.referralCodes?.map((referral) => (
						<ReferralTag
							key={referral?.code}
							referralCode={referral?.code || ''}
							invited={!!referral?.invitedId}
						/>
					))}

					{/* Mock component to help styled-component detect css style */}
					{!web3FarmingProfile?.referralCodes?.[0] && (
						<ReferralTag referralCode="AiGO-J3KL52" />
					)}
					<Text style={styles.explain}>
						New codes will be available once all codes are used!
					</Text>
				</View>
			</View>
		</BoardLayout>
	);
};

export default ReferralBoard;

const styles = StyleSheet.create({
	container: {
		maxWidth: 450,
		alignItems: 'center',
		marginHorizontal: 25,
	},
	contentContainer: {
		marginTop: 32,
		width: '100%',
		maxWidth: 410,
		paddingHorizontal: 25,
		marginBottom: 80,
		gap: 32,
	},
	staticGroup: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 12,
	},
	staticCard: {
		paddingVertical: 24,
		paddingHorizontal: 16,
	},
	separateLine: {
		borderRightWidth: 1,
		borderRightColor: 'rgba(255, 255, 255, 0.1)',
	},
	goPoints: {
		flexDirection: 'row',
		fontSize: 20,
		fontWeight: '600',
	},
	descriptionContainer: {
		padding: 16,
		borderRadius: 12,
	},
	description: {
		textAlign: 'center',
		fontFamily: righteous.style.fontFamily,
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 24,
	},
	referralCodeContainer: {
		gap: 16,
	},
	explain: {
		paddingVertical: 22,
		textAlign: 'center',
		lineHeight: 20,
		fontWeight: '500',
		color: '#444649',
	},
});
