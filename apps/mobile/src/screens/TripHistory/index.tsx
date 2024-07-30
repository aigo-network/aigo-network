import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeContainer from '@aigo/components/SafeContainer';
import ScreenHeader from 'components/ScreenHeader';
import { appState } from 'state/app';
import { mapActions } from 'state/map';
import { defaultTheme } from 'utils/global';
import { useTrips } from 'utils/hooks/trips';
import { useSnapshot } from 'valtio';

import TripItem from './TripItem';

export const TripHistoryScreen = () => {
	const { content } = useSnapshot(appState);
	const [refreshing, setRefreshing] = useState(false);
	const { trips, lastTripConnection } = useTrips();
	const { title } = content.screens.tripHistory;

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
				<ScreenHeader style={styles.headerContainer} title={title} />
				<FlatList
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					indicatorStyle="black"
					data={trips}
					keyExtractor={(item) => item.id as string}
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
	pagingLoading: {
		marginVertical: 16,
	},
});
