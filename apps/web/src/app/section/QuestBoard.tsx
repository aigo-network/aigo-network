import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Image from 'next/image';

import QuestCard from './QuestCard';

const QuestBoard: FC = () => {
	return (
		<View style={styles.container}>
			<View style={styles.bgLayer}>
				<Image
					src="/bg-layer.svg"
					alt="background layer"
					width={1204}
					height={958}
				/>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.questContainer}>
					<QuestCard order={1} point={128} description="Like our Post on X" />
					<QuestCard
						order={2}
						point={128}
						description="Retweet our Post on X"
					/>
					<QuestCard
						order={3}
						point={128}
						description={`Download AiGO on iOS\nor Android`}
					/>
					<QuestCard
						order={4}
						point={128}
						description="Connect with X or Google"
					/>
				</View>
			</View>
		</View>
	);
};

export default QuestBoard;

const styles = StyleSheet.create({
	container: {
		maxWidth: 1248,
		backgroundColor: '#000',
		alignSelf: 'center',
		paddingHorizontal: 24,
		position: 'relative',
	},
	bgLayer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
	},
	innerContainer: {
		borderWidth: 1,
		borderColor: '#1f1f1f',
		borderRadius: 16,
		backgroundColor: '#141414',
		padding: 12,
		transform: [{ translateY: -40 }],
	},
	questContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 12,
	},
});
