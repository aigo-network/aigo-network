import type {
	GeolocationConfiguration,
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation';
import Geolocation from '@react-native-community/geolocation';

const config: GeolocationConfiguration = {
	skipPermissionRequests: false,
	enableBackgroundLocationUpdates: true, // iOS-only
	authorizationLevel: 'whenInUse', // iOS-only
};

Geolocation.setRNConfiguration(config);

export type GeolocationPermissionError = {
	code: number;
	message: string;
	PERMISSION_DENIED: number;
	POSITION_UNAVAILABLE: number;
	TIMEOUT: number;
};

export type RequestPermissionConfig = {
	onSuccess?: () => void;
	onDenied?: () => void;
	onUnavailable?: () => void;
};

export const handleRequestGeolocationPermission = (
	config: RequestPermissionConfig,
) => {
	Geolocation.requestAuthorization(
		() => {
			config.onSuccess?.();
		},
		(error: GeolocationError) => {
			if (error.code === error.TIMEOUT) {
				handleRequestGeolocationPermission(config);
			} else if (error.code === error.PERMISSION_DENIED) {
				config.onDenied?.();
			} else if (error.code === error.POSITION_UNAVAILABLE) {
				config.onUnavailable?.();
			}
		},
	);
};

export const getCurrentPosition = (): Promise<GeolocationResponse> => {
	return new Promise<GeolocationResponse>((resolve, reject) => {
		Geolocation.getCurrentPosition(
			(res: GeolocationResponse) => {
				console.log(res);
				resolve(res);
			},
			(error: GeolocationError) => {
				console.log(error);
				reject(error);
			},
			{
				// important: to get GPS instead of Wifi location
				enableHighAccuracy: true,
			},
		);
	});
};
