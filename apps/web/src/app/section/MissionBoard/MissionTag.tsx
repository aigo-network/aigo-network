import { StyleSheet, Text, View } from 'react-native';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Twitter from '@aigo/components/icon/Twitter';

import Tag from '@/components/Tag';

const MissionTag = () => {
	return (
		<Tag>
			<View style={styles.container}>
				<Twitter width={30} color="#fff" />
				<View style={styles.descriptionContainer}>
					<Text style={styles.description}>Like AiGO post on Twitter</Text>
					<Text style={styles.point}>+300 GO</Text>
				</View>
				<View style={styles.icon}>
					<ChevronUp width={20} color="White" />
				</View>
			</View>
		</Tag>
	);
};

export default MissionTag;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 24,
		paddingHorizontal: 24,
		paddingVertical: 16,
	},
	descriptionContainer: {
		flex: 1,
	},
	description: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: '500',
	},
	point: {
		fontWeight: '500',
		lineHeight: 20,
		color: '#81ddfb',
	},
	icon: {
		transform: [{ rotate: '90deg' }],
	},
});
