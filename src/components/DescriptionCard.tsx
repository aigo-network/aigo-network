import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
	item: {
		label: string;
		value: string;
	};
	selectedList: readonly string[];
	width?: number;
	onPress?: (selectedList: string[]) => void;
}

export const DescriptionCard: FC<Props> = ({
	item,
	selectedList,
	width,
	onPress,
}) => {
	const [isSelected, setIsSelected] = useState(
		selectedList.includes(item.value),
	);
	const cardWidth = width ? { flexBasis: width } : {};
	const labelStyle = { color: isSelected ? '#383535' : '#afb2ff' };

	const handleCardPressed = () => {
		const idx = selectedList.findIndex((value) => value === item.value);
		if (idx === -1) {
			const newSelectedList = [...selectedList, item.value];
			onPress?.(newSelectedList);
			setIsSelected(true);
		} else {
			const filteredList = selectedList.filter((value) => value !== item.value);
			onPress?.(filteredList);
			setIsSelected(false);
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handleCardPressed}>
			<View style={[styles.card, isSelected && styles.selectedCard, cardWidth]}>
				<Text style={[styles.label, labelStyle]}>{item.label}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default DescriptionCard;

const styles = StyleSheet.create({
	container: {
		width: '50%',
	},
	card: {
		margin: 8,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderRadius: 16,
		justifyContent: 'center',
		height: 72,
		borderColor: '#afb2ff',
	},
	label: {
		fontFamily: 'Gabarito',
		fontSize: 16,
		lineHeight: 25,
		textAlign: 'center',
	},
	selectedCard: {
		backgroundColor: '#fffffe',
		borderColor: '#e3e3e3',
	},
});
