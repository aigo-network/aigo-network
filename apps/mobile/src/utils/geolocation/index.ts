/**
 * Configure Geolocation and expose geolocation util wrapper
 */

import type {
	GeolocationConfiguration,
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation';
import Geolocation from '@react-native-community/geolocation';
import { appState } from 'state/app';

import type { RequestPermissionConfig } from './types';

const config: GeolocationConfiguration = {
	skipPermissionRequests: false,
	enableBackgroundLocationUpdates: true, // iOS-only
	authorizationLevel: 'whenInUse', // iOS-only
};

Geolocation.setRNConfiguration(config);

export const requestGeolocationPermission = (
	config: RequestPermissionConfig,
) => {
	Geolocation.requestAuthorization(
		async () => {
			config.onSuccess?.();
		},
		(error: GeolocationError) => {
			if (error.code === error.TIMEOUT) {
				// retry request location
				requestGeolocationPermission(config);
			} else if (error.code === error.PERMISSION_DENIED) {
				config.onDenied?.();
			} else if (error.code === error.POSITION_UNAVAILABLE) {
				config.onUnavailable?.();
			}
		},
	);
};

export const watchLocation = (
	onUpdate: (position: GeolocationResponse) => void,
) => {
	Geolocation.watchPosition(
		async (position: GeolocationResponse) => {
			onUpdate(position);
		},
		(error) => {
			console.log('error watching position', error);
		},
		appState.remoteConfig.watchPositionOptions,
	);
};

/**
 * promise wrapper of `Geolocation.getCurrentPosition`.
 *
 * Note: it does not work with called watchLocation
 */
export const getCurrentLocation = (
	timeout: number = 2000,
): Promise<GeolocationResponse> => {
	return new Promise<GeolocationResponse>((resolve, reject) => {
		Geolocation.getCurrentPosition(
			(res: GeolocationResponse) => {
				resolve(res);
			},
			(error: GeolocationError) => {
				reject(error);
			},
			{
				// important: to get GPS instead of Wifi location
				enableHighAccuracy: true,
				timeout,
			},
		);
	});
};

export * from './types';
