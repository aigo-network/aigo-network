import { useEffect } from 'react';
import { graphqlClient } from '@aigo/api/graphql';
import type { Trip } from '@aigo/api/sdk';
import crashlytics from '@react-native-firebase/crashlytics';
import type { TodaySummary } from 'state/map';
import { mapActions, useMapState } from 'state/map';

type UseTripsReturn = {
	trips: Trip[];
	todaySummary: TodaySummary;
};

export const useTrips = (): UseTripsReturn => {
	const { trips, todaySummary } = useMapState();

	useEffect(() => {
		if (trips) return;

		const queryAndUpdateTripsState = async () => {
			try {
				const { trips } = await graphqlClient.getTrips();
				const tripNodes = trips?.edges.map((e) => e?.node).filter((e) => !!e);
				if (tripNodes) mapActions.setTrips(tripNodes as Trip[]);
			} catch (error) {
				crashlytics().recordError(error as Error, 'getTrips');
			}
		};

		queryAndUpdateTripsState();
	}, []);

	return { trips: trips || [], todaySummary };
};
