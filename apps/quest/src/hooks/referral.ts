import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

import { appState } from '@/state/app';

export const useReferralCodes = () => {
	const { web3FarmingProfile } = useSnapshot(appState);

	return useMemo(() => {
		const total = web3FarmingProfile?.referralCodes?.length || 0;
		const invited = web3FarmingProfile?.referralCodes?.filter(
			(referral) => referral?.invitedId,
		);
		const unInvited = web3FarmingProfile?.referralCodes?.filter(
			(referral) => !referral?.invitedId,
		);
		const invitedCount = invited?.length || 0;
		const unusedCount = total - invitedCount;

		return {
			total,
			invitedCount,
			unusedCount,
			invitedList: invited,
			unInvitedList: unInvited,
		};
	}, [web3FarmingProfile?.referralCodes]);
};
