import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

import { appState } from '@/state/app';

export const useInvitedReferral = () => {
	const { web3FarmingProfile } = useSnapshot(appState);

	return useMemo(() => {
		const invited = web3FarmingProfile?.referralCodes?.filter(
			(referral) => referral?.invitedId,
		);

		return {
			count: web3FarmingProfile?.id ? invited?.length : 0, // Condition to exclude initial mock data
			invitedList: invited,
		};
	}, [web3FarmingProfile?.referralCodes]);
};
