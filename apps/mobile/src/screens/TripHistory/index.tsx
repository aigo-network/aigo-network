import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeContainer from '@aigo/components/SafeContainer';
import ScreenHeader from 'components/ScreenHeader';
import { mapActions } from 'state/map';
import { defaultTheme } from 'utils/global';
import { useTrips } from 'utils/hooks/trips';

import TripItem from './TripItem';

export const TripHistoryScreen = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { trips, lastTripConnection } = useTrips();

	const handleRefresh = async () => {
		setRefreshing(true);
		await mapActions.queryAndUpdateTripsState();
		setRefreshing(false);
	};

	const handleEndReached = async () => {
		if (!lastTripConnection || !lastTripConnection.pageInfo.hasNextPage) return;

		await mapActions.queryAndUpdateTripsState(
			{
				after: lastTripConnection.pageInfo.endCursor as string,
				first: 10,
			},
			true,
		);
	};

	return (
		<View style={styles.container}>
			<SafeContainer>
				<ScreenHeader style={styles.headerContainer} title="Trip History" />
				<FlatList
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					indicatorStyle="black"
					data={trips}
					renderItem={({ item }) => <TripItem trip={item} />}
					onRefresh={handleRefresh}
					refreshing={refreshing}
					onEndReached={handleEndReached}
				/>
			</SafeContainer>
		</View>
	);
};

export default TripHistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	headerContainer: {
		paddingHorizontal: 16,
	},
	scrollContainer: {
		flex: 1,
		marginTop: 14,
		paddingHorizontal: 16,
	},
	scrollContentContainer: {
		flexGrow: 1,
		gap: 14,
	},
});
