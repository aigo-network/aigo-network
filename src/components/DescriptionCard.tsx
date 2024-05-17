import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
	const cardWidth = width ? { flexBasis: width } : {};
	const cardStyle = isSelected
		? {
				backgroundColor: '#fffffe',
				borderColor: '#e3e3e3',
			}
		: {
				borderColor: '#afb2ff',
			};
	const labelStyle = { color: isSelected ? '#383535' : '#afb2ff' };

	return (
		<TouchableOpacity
			style={[styles.container, cardWidth, cardStyle]}
			onPress={handleCardPressed}
		>
			<Text style={[styles.label, labelStyle]}>{item.label}</Text>
		</TouchableOpacity>
	);
};

export default DescriptionCard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		borderWidth: 1,
		borderRadius: 16,
		justifyContent: 'center',
		height: 72,
		flexGrow: 1,
	},
	label: {
		fontFamily: 'Gabarito',
		fontSize: 16,
		lineHeight: 25,
		textAlign: 'center',
	},
});
