import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import { getMapState, mapActions } from 'state/map';
import type { AppStateChangeCallback } from 'utils/hooks/appState';

import { watchLocation } from './utils';

let backgroundLocationListenerId: number;

const watchLocationInBackground = async () => {
	await new Promise<void>((resolve) => {
		const tripRunning = !!getMapState().currentTrip;
		if (tripRunning) {
			console.debug(
				'[Background] found pending route, continue to watch location',
			);
			backgroundLocationListenerId = watchLocation(async (position) => {
				await mapActions.setCurrentLocation(position);
			});
		} else {
			console.debug('[Background] no route found, resolved');
			resolve();
		}
	});
};

const options = {
	taskName: 'Trip tracking',
	taskTitle: 'AiGO Trip tracking',
	taskDesc: 'Your trip is running. Keep going!',
	taskIcon: {
		name: 'ic_launcher',
		type: 'mipmap',
	},
	color: '#ff00ff',
	linkingURI: 'network.aigo.app://map',
};

export const startBackground = async () => {
	await BackgroundService.start(watchLocationInBackground, options);
};

export const stopBackground = async () => {
	await BackgroundService.stop();
	if (backgroundLocationListenerId)
		Geolocation.clearWatch(backgroundLocationListenerId);
};

export const handleAppStateChangeForBackgroundGPS: AppStateChangeCallback = (
	prev,
	cur,
) => {
	if (cur === 'background' && prev === 'active') {
		console.debug('start background task');
		startBackground();
	} else if (cur === 'active' && prev === 'background') {
		console.debug('stop background task');
		stopBackground();
	}
};
