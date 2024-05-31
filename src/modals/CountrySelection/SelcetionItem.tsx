import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface CountryItem {
	name: string;
	dial_code: string;
	emoji: string;
	code: string;
}

interface Props<T = CountryItem> {
	item: T;
	onItemSelect?: (item: T) => void;
}

export const SelectionItem: FC<Props> = ({ item, onItemSelect }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.countryBtn}
				onPress={() => onItemSelect?.(item)}
			>
				<Text style={{ fontSize: 24 }}>{item.emoji}</Text>
				<Text style={{ fontSize: 17 }}>{item.name}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	countryBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		height: 60,
	},
});
