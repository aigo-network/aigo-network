import { createContext } from 'react';
import type { userAgent } from 'next/server';

import { showImportCode } from '@/modals/ShowImportCode';
import { appState } from '@/state/app';

export const isMobileBrowser = () => {
	const userAgent = navigator.userAgent;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		userAgent,
	);
};

export type UserAgent = ReturnType<typeof userAgent>;
export const UserAgentContext = createContext<UserAgent | undefined>(undefined);

export type OperatingSystem = 'iOS' | 'Android' | 'Unknown';

export const getMobileOperatingSystem = (): OperatingSystem => {
	/* eslint-disable-next-line */
	const window = global.window as any;
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(userAgent)) {
		return 'Android';
	}

	if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
		return 'iOS';
	}

	return 'Unknown';
};

export const ensureFarmingProfile = (callback?: () => void) => {
	if (appState.web3FarmingProfile?.id) {
		callback?.();
	} else {
		showImportCode();
	}
};
