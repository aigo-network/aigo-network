import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from 'next/image';

import Button from '@/components/Button';
import { ensureFarmingProfile } from '@/utils/helper';

interface Props {
	order: number;
	point: number;
	description: string;
	onActionPress?: () => void;
	onCheckPress?: () => void;
}

const QuestCard: FC<Props> = ({
	order,
	point,
	description,
	onActionPress,
	onCheckPress,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.questOrder}>{String(order).padStart(2, '0')}</Text>
			<View style={styles.pointContainer}>
				<Image
					style={styles.bgLayer}
					src="/bg-layer.svg"
					alt="background layer"
					width={1204}
					height={958}
				/>
				<Text style={styles.point}>{`+${point} GO`}</Text>
			</View>
			<Text style={styles.questDescription}>{description}</Text>
			<View style={styles.btnGroup}>
				<Button
					style={styles.btnLeft}
					onPress={() => ensureFarmingProfile(onActionPress)}
				>
					<Image
						src="/left-angle-ic.svg"
						alt="left angle icon"
						width={8}
						height={16}
						style={{ alignSelf: 'center' }}
					/>
				</Button>
				<Button
					style={styles.btnRight}
					onPress={() => ensureFarmingProfile(onCheckPress)}
				>
					<Text style={styles.textRight}>Check</Text>
				</Button>
			</View>
		</View>
	);
};

export default QuestCard;

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#262626',
		backgroundColor: '#1b1b1b',
		width: 274,
	},
	questOrder: {
		width: 40,
		height: 40,
		marginTop: 5,
		marginLeft: 5,
		alignContent: 'center',
		textAlign: 'center',
		fontWeight: '600',
		lineHeight: 20,
		color: '#707174',
		letterSpacing: 14 * 0.12,
	},
	pointContainer: {
		marginTop: 16,
		paddingHorizontal: 32,
		paddingVertical: 28,
		alignSelf: 'center',
		borderWidth: 4,
		borderColor: '#141414',
		borderRadius: 100,
		position: 'relative',
		overflow: 'hidden',
	},
	bgLayer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	point: {
		fontSize: 32,
		fontWeight: '500',
		lineHeight: 40,
		color: '#6EBCD5',
	},
	questDescription: {
		fontSize: 20,
		fontWeight: '500',
		lineHeight: 28,
		color: '#e3e4e6',
		paddingHorizontal: 12,
		marginTop: 36,
		flex: 1,
	},
	btnGroup: {
		margin: 12,
		marginTop: 20,
		flexDirection: 'row',
		gap: 8,
	},
	btnLeft: {
		flex: 1,
		backgroundColor: '#35363a',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnRight: {
		flex: 1,
		backgroundColor: '#81ddfb',
		justifyContent: 'center',
	},
	textRight: {
		color: '#232529',
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		textAlign: 'center',
	},
});
