import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import {
	getTrackingStatus,
	requestTrackingPermission,
} from 'react-native-tracking-transparency';
import { graphqlClient } from '@aigo/api/graphql';
import crashlytics from '@react-native-firebase/crashlytics';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const useAppConfigure = () => {
	useEffect(() => {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent');
			StatusBar.setTranslucent(true);
		}

		crashlytics().setAttributes({
			version: appState.version,
			buildNumber: appState.buildNumber,
			buildHash: appState.buildHash,
		});
	}, []);
};

export const useUserProfile = (forceUpdate?: boolean) => {
	const { appUser } = useSnapshot(appState);

	useEffect(() => {
		const loadUser = async () => {
			const { user } = await graphqlClient.getUserWitDailyMissions();
			if (user) appActions.setAppUser(user);
		};

		if (!appState.appUser || forceUpdate) {
			loadUser();
		}
	}, []);

	return appUser;
};

export const useTransparencyTracking = () => {
	useEffect(() => {
		const handleTrackingStatus = async () => {
			if (Platform.OS === 'ios') {
				const trackingStatus = await getTrackingStatus().catch((error) =>
					console.log(error),
				);

				if (trackingStatus === 'not-determined') {
					await requestTrackingPermission();
				}
			}
		};

		handleTrackingStatus();
	}, []);
};
