import type { FC } from 'react';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InfoIcon from './icon/InfoIcon';
import Tick from './icon/Tick';

export enum Status {
	Good = 'Good',
	Warning = 'Warning',
}

interface Props {
	status: Status;
	goodLabel: string;
	warningLabel: string;
}

const StatusTag: FC<Props> = ({ status, goodLabel, warningLabel }) => {
	const containerBg = {
		backgroundColor:
			status === Status.Good ? 'rgba(0, 168, 47, .2)' : 'rgba(234, 156, 8, .2)',
	};
	const labelColor = { color: status === Status.Good ? '#00a82f' : '#ea9c08' };

	return (
		<View style={[styles.container, containerBg]}>
			{status === Status.Good ? (
				<Fragment>
					<Tick color="#00a82f" width={10} />
					<Text style={[styles.label, labelColor]}>{goodLabel}</Text>
				</Fragment>
			) : (
				<Fragment>
					<InfoIcon size={12} />
					<Text style={[styles.label, labelColor]}>{warningLabel}</Text>
				</Fragment>
			)}
		</View>
	);
};

export default StatusTag;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 20,
	},
	label: {
		fontSize: 12,
	},
});
