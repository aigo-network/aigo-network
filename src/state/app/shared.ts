import type { TrackingStatus } from 'react-native-tracking-transparency';
import type { User } from 'api/graphql';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	trackingStatus: TrackingStatus;
}

export const initAppState: AppState = {
	onboarding: {},
	trackingStatus: 'not-determined',
};

export const appState = proxy<AppState>(initAppState);
