import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Slide, toast } from 'react-toastify';
import type { Web3FarmingReferralCode } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import CopyAll from './CopyAll';
import ReferralTag from './ReferralTag';
import StaticCard from './StaticCard';

import BoardLayout from '@/components/BoardLayout';
import { useReferralCodes } from '@/hooks/referral';
import { appActions, appState } from '@/state/app';
import { clashDisplay } from '@/utils/style';

type Props = {
	isMobile?: boolean;
};

const ReferralBoard: FC<Props> = ({ isMobile }) => {
	const { user, web3FarmingProfile } = useSnapshot(appState);
	const { total, invitedCount } = useReferralCodes();

	const handleRefreshReferrals = async () => {
		const { web3FarmingRefreshReferrals } =
			await graphqlClient.web3FarmingRefreshReferrals();
		const codes = web3FarmingRefreshReferrals?.filter((c) => c !== null) || [];
		appActions.updateReferralCodes(codes as Web3FarmingReferralCode[]); // temp fix type-check did not know about null filter
	};

	useEffect(() => {
		if (total > 0 && total === invitedCount) {
			// refresh
			toast.promise(
				handleRefreshReferrals,
				{
					pending: 'Refreshing referral codes',
					success: 'Yo! Invite and get more GO points',
					error: 'Can not refresh referral codes',
				},
				{
					position: 'bottom-right',
					autoClose: 5000,
					pauseOnHover: true,
					hideProgressBar: true,
					transition: Slide,
					theme: 'dark',
				},
			);
		}
	}, [total]);

	return (
		<BoardLayout
			style={styles.container}
			contentContainerStyle={[
				styles.contentContainer,
				isMobile && styles.mobileContainer,
			]}
			title="Referrals"
			subTitle="MORE FRIENDS, MORE FUN, MORE GO POINTS!"
		>
			<View style={styles.innerContainer}>
				<View style={styles.staticGroup}>
					<StaticCard
						style={styles.staticCard}
						value={user?.GOPoints || 0}
						parameter="GO POINT"
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
						value={web3FarmingProfile?.countSuccessReferrals || 0}
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
					colors={bannerGradients}
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
							user={user as never}
							farmingProfile={web3FarmingProfile as never}
							item={referral}
						/>
					))}

					{user?.id && <CopyAll farmingProfile={web3FarmingProfile as never} />}

					<Text style={styles.explain}>
						New codes will be available once all codes are used!
					</Text>
				</View>
			</View>
		</BoardLayout>
	);
};

export default ReferralBoard;

const bannerGradients = [
	'rgba(129, 221, 251, 0.25)',
	'rgba(98, 91, 246, 0.25)',
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minWidth: 320,
	},
	contentContainer: {
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
	innerContainer: {
		paddingTop: 32,
		gap: 32,
	},
	mobileContainer: {
		minWidth: 0,
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
		fontFamily: clashDisplay.style.fontFamily,
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
