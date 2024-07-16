import { useEffect } from 'react';
import device from 'react-native-device-info';
import {
	checkNotifications,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import { graphqlClient } from '@aigo/api/graphql';
import crashlytics from '@react-native-firebase/crashlytics';
import getMessaging from '@react-native-firebase/messaging';

const syncDeviceAndNotification = async (nextToken?: string) => {
	const [deviceId, deviceName, manufacturer, platform, carrier] =
		await Promise.all([
			await device.getUniqueId(),
			await device.getDeviceName(),
			await device.getManufacturer(),
			await device.getBaseOs(),
			await device.getCarrier(),
		]);

	await graphqlClient.registerDevice({
		input: {
			deviceId,
			platform,
			manufacturer,
			carrier,
			deviceName,
			brand: device.getBrand(),
			appVersion: `${device.getVersion()} Build ${device.getBuildNumber()}`,
			deviceType: device.getDeviceType(),
			systemVersion: device.getSystemVersion(),
			notificationToken: nextToken,
		},
	});
};

export const useNotifications = () => {
	useEffect(() => {
		const messaging = getMessaging();

		messaging.onNotificationOpenedApp((message) => {
			console.log('App to opened from BG:', message.notification);
		});

		messaging.getInitialNotification().then((message) => {
			if (message) {
				console.log('App resumed from quit', message.notification);
			}
		});

		const unsubscribeMessages = messaging.onMessage(async (message) => {
			console.log(message);
		});

		const unsubscribeTokenRefresh = messaging.onTokenRefresh((nextToken) => {
			syncDeviceAndNotification(nextToken);
		});

		checkNotifications().then(async ({ status }) => {
			if (status === RESULTS.GRANTED) {
				syncDeviceAndNotification(await messaging.getToken());
			} else {
				syncDeviceAndNotification();
			}
		});

		return () => {
			unsubscribeMessages();
			unsubscribeTokenRefresh();
		};
	}, []);
};

export const useNotificationPermissionRequest = () => {
	useEffect(() => {
		checkNotifications().then(async ({ status }) => {
			if (status !== RESULTS.GRANTED) {
				await requestNotifications(['alert', 'badge', 'sound']);
			}

			try {
				syncDeviceAndNotification(await getMessaging().getToken());
			} catch (e) {
				crashlytics().recordError(e as Error);
				console.log('Failed to get/sync Notification token from device');
			}
		});
	}, []);
};
