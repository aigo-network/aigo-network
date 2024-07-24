import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmPopup from '@aigo/components/ConfirmPopup';
import * as turf from '@turf/turf';
import { Align, showModal } from 'empty-modal';
import { appState } from 'state/app';
import { getMapState, useMapState } from 'state/map';

export const emptyRoute: GeoJSON.LineString = {
	type: 'LineString',
	coordinates: [
		[0, 0],
		[0, 0],
	],
};

export const useCurrentCoordinate = () => {
	const { currentLocation } = useMapState();

	const coordinate = useMemo(() => {
		if (!currentLocation) return;
		const { longitude, latitude } = currentLocation.coords;

		return [longitude, latitude];
	}, [currentLocation]);

	return { coordinate };
};

const MS_PER_MINUTE = 1000 * 60;

export const useCurrentTrip = () => {
	const { currentTrip } = useMapState();
	const [time, setTime] = useState(0);

	const distance = useMemo(() => {
		if (!currentTrip) return 0;

		const line = turf.lineString(currentTrip.coordinates);
		const length = turf.length(line, { units: 'kilometers' });

		return length.toPrecision(2);
	}, [currentTrip]);

	useEffect(() => {
		const timer = setInterval(() => {
			const trip = getMapState().currentTrip;
			if (!trip) return;

			const timeInMs = new Date().valueOf() - trip.startedAt.valueOf();
			setTime(Math.round(timeInMs / MS_PER_MINUTE));
		}, MS_PER_MINUTE);

		return () => clearInterval(timer);
	}, []);

	return { distance, time };
};

export const useBouncedMapInsets = () => {
	const insets = useSafeAreaInsets();

	const safeInsets = useMemo(() => {
		const top = Math.max(insets.top, 20);
		const bottom = Math.max(insets.top, 20);

		return { ...insets, top, bottom };
	}, [insets]);

	const scaleBarPosition = useMemo(() => {
		const top = Platform.OS === 'ios' ? 0 : Math.max(insets.top, 20);
		const left = Math.max(insets.left, 20);

		return { top, left };
	}, [insets]);

	return { safeInsets, scaleBarPosition };
};

export const showConfirmEndTrip = ({ logout }: { logout: () => void }) => {
	const { confirm, cancel, confirmLogOutMessage } = appState.content.modal;
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				yesText={confirm}
				noText={cancel}
				message={confirmLogOutMessage}
				onClose={() => {
					cleanModal();
				}}
				onConfirm={() => {
					logout();
					cleanModal();
				}}
				onReject={() => {
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'confirm-end-trip',
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};
