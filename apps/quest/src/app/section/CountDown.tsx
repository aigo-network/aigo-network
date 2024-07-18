import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
} from 'date-fns';

interface Props {
	date: Date;
	style?: StyleProp<TextStyle>;
}

const CountDown: FC<Props> = ({ date, style }) => {
	const [timeLeft, setTimeLeft] = useState({
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			setTimeLeft({
				day: differenceInDays(date, now),
				hour: differenceInHours(date, now) % 24,
				minute: differenceInMinutes(date, now) % 60,
				second: differenceInSeconds(date, now) % 60,
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Text
			style={[styles.container, style]}
		>{`${timeLeft.day.toString().padStart(2, '0')}D : ${timeLeft.hour.toString().padStart(2, '0')}H : ${timeLeft.minute.toString().padStart(2, '0')}M : ${timeLeft.second.toString().padStart(2, '0')}S`}</Text>
	);
};

export default CountDown;

const styles = StyleSheet.create({
	container: {
		textAlign: 'center',
	},
});
