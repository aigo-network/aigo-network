import { useEffect, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

export type AppStateChangeCallback = (
	prevState: AppStateStatus,
	state: AppStateStatus,
) => void;

export const useAppState = (onStateChange?: AppStateChangeCallback) => {
	const [prevAppState, setPrevAppState] = useState(AppState.currentState);
	const [appState, setAppState] = useState(AppState.currentState);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			setPrevAppState(appState); // Store the previous app state
			setAppState(nextAppState); // Update the current app state
			onStateChange?.(appState, nextAppState);
		};

		const appStateSubscription = AppState.addEventListener(
			'change',
			handleAppStateChange,
		);

		return () => {
			appStateSubscription.remove();
		};
	}, [appState]);

	return { prevAppState, appState };
};
