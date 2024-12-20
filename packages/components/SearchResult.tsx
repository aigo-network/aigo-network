import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

export interface CitiesData {
	name: string;
	country: string;
	subcountry: string;
	geonameid: number;
}

interface Props {
	style?: ViewStyle;
	data: CitiesData[];
	textSearch: string;
	emptySearchTitle?: string;
	emptySearchMessage?: string;
	onItemPress?: (item: CitiesData) => void;
}

export const SearchResult: FC<Props> = ({
	style,
	data,
	textSearch,
	emptySearchTitle,
	emptySearchMessage,
	onItemPress,
}) => {
	const containerStyle = { paddingVertical: data.length > 0 ? 10 : 0 };
	const renderItem = ({ item }: { item: CitiesData }) => {
		return (
			<SearchRenderItem
				item={item}
				textSearch={textSearch}
				onPress={onItemPress}
			/>
		);
	};

	if (textSearch.length > 0 && data.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyTitle}>{emptySearchTitle}</Text>
				<Text style={styles.emptyText}>{emptySearchMessage}</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			style={[styles.container, containerStyle, style]}
		/>
	);
};

interface ItemProps {
	item: CitiesData;
	textSearch: string;
	onPress?: (item: CitiesData) => void;
}

const SearchRenderItem: FC<ItemProps> = ({ item, onPress }) => {
	return (
		<TouchableOpacity onPress={() => onPress?.(item)}>
			<View style={styles.itemContainer}>
				<Text style={styles.itemText}>{cityToString(item)}</Text>
			</View>
		</TouchableOpacity>
	);
};

export const cityToString = (city: CitiesData) =>
	`${city.name}, ${city.subcountry} ${city.country}`;

export default SearchResult;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#7653ff',
		maxHeight: 300,
		borderRadius: 25,
	},
	itemContainer: {
		paddingHorizontal: 30,
		paddingVertical: 5,
	},
	itemText: {
		lineHeight: 25,
	},
	emptyContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	emptyTitle: {
		fontSize: 25,
		textAlign: 'center',
		marginTop: 50,
	},
	emptyText: {
		fontSize: 16,
		color: '#969AFF',
		textAlign: 'center',
		marginTop: 10,
	},
});
