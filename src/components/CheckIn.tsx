import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { config } from 'utils/config';

import Tick from './icon/Tick';
import X from './icon/X';

type Props = {
	width: number;
	status: 'checkedIn' | 'missed' | 'today' | 'todayCheckedIn' | 'next';
	dayNumber: number;
};

export const CheckIn: FC<Props> = ({ width, status, dayNumber }) => {
	return (
		<View style={[styles.container, { width }]}>
			<View
				style={[
					styles.boxContainer,
					{ backgroundColor: colorMap[status].bg },
					status.includes('today') && styles.highlight,
				]}
			>
				<Text style={{ color: colorMap[status].text }}>
					{config.activity.DailyCheckIn.points} GO
				</Text>
				{status === 'checkedIn' ? (
					<View
						style={[{ backgroundColor: colorMap[status].iconBg }, styles.icon]}
					>
						<Tick width={24} color={colorMap[status].icon} />
					</View>
				) : status === 'missed' ? (
					<View
						style={[{ backgroundColor: colorMap[status].iconBg }, styles.icon]}
					>
						<X width={20} color={colorMap[status].icon} />
					</View>
				) : (
					<Image
						style={styles.icon}
						source={require('assets/img/aigo-checkin.png')}
					/>
				)}
			</View>
			<Text style={{ textAlign: 'center', color: colorMap[status].dayText }}>
				Day {dayNumber}
			</Text>
		</View>
	);
};

export default CheckIn;

const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
	boxContainer: {
		padding: 10,
		gap: 4,
		borderRadius: 8,
	},
	icon: {
		width: 34,
		height: 34,
		borderRadius: 17,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	highlight: {
		borderWidth: 0.5,
		borderColor: '#714CFE',
	},
});

const colorMap = {
	checkedIn: {
		bg: '#BEB2EB4D',
		iconBg: '#CBC2F080',
		icon: '#AB96F980',
		text: '#714CFE80',
		dayText: '#A9A9A9',
	},
	missed: {
		bg: '#F4F4F4',
		iconBg: '#D9D9D9',
		icon: '#F4F4F4',
		text: '#A9A9A9',
		dayText: '#A9A9A9',
	},
	today: {
		bg: '#D8D2F6',
		iconBg: '#BEB2EB80',
		icon: '#714CFE',
		text: '#714CFE',
		dayText: '#714CFE',
	},
	todayCheckedIn: {
		bg: '#D8D2F6',
		iconBg: '#BEB2EB80',
		icon: '#714CFE',
		text: '#714CFE',
		dayText: '#714CFE',
	},
	next: {
		bg: '#F4F4F4',
		iconBg: '#BEB2EB80',
		icon: '#714CFE',
		text: '#595959',
		dayText: '#A9A9A9',
	},
};
