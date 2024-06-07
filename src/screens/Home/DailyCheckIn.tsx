import { useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { DailyCheckIn as DailyCheckInType } from 'api/graphql';
import { graphqlClient } from 'api/graphql';
import CheckIn from 'components/CheckIn';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { sharedStyles, showCheckInPoint } from './shared';

const DAYS_PER_WEEK = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const DailyCheckIn = () => {
	const scrollViewRef = useRef<ScrollView>(null);
	const [loading, setLoading] = useState(false);
	const { content, appUser } = useSnapshot(appState);
	const homeContent = content.screens.home;
	const todayCheckedIn = !!appUser?.dailyMissions?.checkIn?.completed;

	const latest7DaysCheckIns: (DailyCheckInType | null)[] = useMemo(() => {
		const checkIns = [...(appUser?.dailyMissions?.latest7DaysCheckIn || [])];
		const mergedCheckIns = [];
		for (let i = 0; i < checkIns.length; i++) {
			mergedCheckIns.push(checkIns[i]);
			if (i === checkIns.length - 1) break;
			const currentDate = new Date(checkIns[i]?.date);
			const nextCheckInDate = new Date(checkIns[i + 1]?.date);
			const daysBetween = Math.ceil(
				(nextCheckInDate.getTime() - currentDate.getTime()) / MS_PER_DAY,
			);
			for (let j = 0; j < daysBetween - 1; j++)
				mergedCheckIns.push({ completed: false });
		}

		const currentDateIndex = mergedCheckIns.length - 1;
		scrollViewRef.current?.scrollTo({ x: currentDateIndex * checkInWidth + 2 });

		if (mergedCheckIns.length < DAYS_PER_WEEK) {
			mergedCheckIns.push(
				...new Array(DAYS_PER_WEEK - mergedCheckIns.length).fill(null),
			);
		}

		return mergedCheckIns;
	}, [appUser]);

	const handleCheckIn = async () => {
		setLoading(true);
		const { checkIn } = await graphqlClient.checkIn();
		const { user } = await graphqlClient.getUser();
		if (user) appActions.setAppUser(user);
		if (checkIn) appActions.updateCheckIn(checkIn);
		if (checkIn?.completed) {
			showCheckInPoint();
		}
		setLoading(false);
	};

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>
					{homeContent.dailyCheckInSection.title}
				</Text>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator />
					</View>
				) : (
					<TouchableOpacity
						style={[
							styles.checkInButton,
							todayCheckedIn && styles.disableCheckInButton,
						]}
						onPress={handleCheckIn}
						disabled={todayCheckedIn}
						hitSlop={14}
					>
						<Text>{homeContent.dailyCheckInSection.checkInButton}</Text>
					</TouchableOpacity>
				)}
			</View>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				snapToInterval={checkInWidth + 4}
				style={styles.checkInsContainer}
				contentContainerStyle={styles.checkInsContentContainer}
				showsHorizontalScrollIndicator={false}
			>
				{latest7DaysCheckIns.map((c, i) => {
					const status =
						c === null ? 'next' : !c.completed ? 'missed' : 'today';
					return (
						<CheckIn
							key={i}
							width={checkInWidth}
							status={status}
							dayNumber={i + 1}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default DailyCheckIn;

const checkInWidth = 66;
const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	loadingContainer: {
		width: 50,
		height: 33,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkInsContainer: {
		flexDirection: 'row',
	},
	checkInsContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	checkInButton: {
		padding: 8,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: '#6740FF',
	},
	disableCheckInButton: {
		backgroundColor: '#BEB2EB80',
	},
});
