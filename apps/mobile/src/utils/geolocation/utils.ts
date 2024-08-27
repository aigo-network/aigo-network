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

	/**
	 * This config forces Android device to only use PlayServices location which is more accurate.
	 * Also the maximumAge is required to be > 0 (alias to durationMilies)
	 */
	// locationProvider: 'playServices',
};

Geolocation.setRNConfiguration(config);

let lastGeolocationPermissionError: GeolocationError | null = null;

export const requestGeolocationPermission = (
	config: RequestPermissionConfig,
) => {
	/**
	 * `Geolocation.requestAuthorization` callbacks are triggered once after first call.
	 * Track the last error to correctly handle permission flow when cont to go to Map screen
	 */
	if (lastGeolocationPermissionError) {
		console.debug('[Geolocation] Use last permission error');
		handleGeolocationError(config, lastGeolocationPermissionError);
		return;
	}

	Geolocation.requestAuthorization(
		async () => {
			console.debug('[Geolocation] Request permission successfully');
			config.onSuccess?.();
		},
		async (error: GeolocationError) => {
			handleGeolocationError(config, error);
		},
	);
};

const handleGeolocationError = (
	config: RequestPermissionConfig,
	error: GeolocationError,
) => {
	if (error.code === error.TIMEOUT) {
		// retry request location
		requestGeolocationPermission(config);
		return;
	}

	lastGeolocationPermissionError = error;

	if (error.code === error.PERMISSION_DENIED) {
		console.debug('[Geolocation] PERMISSION_DENIED');
		config.onDenied?.();
	} else if (error.code === error.POSITION_UNAVAILABLE) {
		config.onUnavailable?.();
		console.debug('[Geolocation] POSITION_UNAVAILABLE');
	} else {
		console.debug('[Geolocation] UNKNOWN_ERROR');
	}
};

export const watchLocation = (
	onUpdate: (position: GeolocationResponse) => void,
) => {
	return Geolocation.watchPosition(
		(position) => {
			onUpdate(position);
		},
		(error) => {
			console.debug('Error watching position', error);
		},
		appState.remoteConfig.watchPositionOptions,
	);
};

/**
 * promise wrapper of `Geolocation.getCurrentPosition`.
 *
 * Note: it does not work with called watchLocation
 */
export const getCurrentLocation = (): Promise<GeolocationResponse> => {
	return new Promise<GeolocationResponse>((resolve, reject) => {
		Geolocation.getCurrentPosition(
			(res: GeolocationResponse) => {
				resolve(res);
			},
			(error: GeolocationError) => {
				reject(error);
			},
			{
				enableHighAccuracy: true,
			},
		);
	});
};
