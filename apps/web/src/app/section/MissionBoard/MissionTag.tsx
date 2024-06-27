import type { FC } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Tick from '@aigo/components/icon/Tick';
import Twitter from '@aigo/components/icon/Twitter';

import Tag from '@/components/Tag';

interface Props {
	id: string;
	description: string;
	point: number;
	completed?: boolean;
	onPress?: () => void;
}

const MissionTag: FC<Props> = ({
	id,
	description,
	point,
	completed = false,
	onPress,
}) => {
	const [hovered, setHovered] = useState(false);
	const [loading, setLoading] = useState(false);
	const onHover = (isHovered: boolean) => {
		if (completed) return;

		setHovered(isHovered);
	};
	const handlePress = () => {
		setLoading(true);
		onPress?.();
	};

	return (
		<View style={{ opacity: completed ? 0.4 : 1 }}>
			<Tag disabled={completed} onHover={onHover} onPress={handlePress}>
				<View style={[styles.container, completed && { opacity: 0.25 }]}>
					<Twitter width={30} color="#fff" />
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}>{description}</Text>
						<Text style={styles.point}>{`+${point} GO`}</Text>
					</View>
					{completed ? (
						<Tick width={20} color="#ffffff" />
					) : loading ? (
						<ActivityIndicator color="#ffffff" />
					) : (
						<View style={styles.icon}>
							<ChevronUp width={24} color={hovered ? '#ffffff' : '#999999'} />
						</View>
					)}
				</View>
			</Tag>
		</View>
	);
};

export default MissionTag;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 18,
		paddingVertical: 16,
		pointerEvents: 'none',
	},
	descriptionContainer: {
		flex: 1,
		paddingHorizontal: 12,
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
