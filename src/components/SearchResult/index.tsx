import type { ListRenderItem, ViewStyle } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';

interface Props<T> {
	style?: ViewStyle;
	data: T[];
	renderItem: ListRenderItem<T>;
}

export const SearchResult = <T extends object>({
	style,
	data,
	renderItem,
}: Props<T>) => {
	console.log(data);
	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			style={[styles.container, style]}
		/>
	);
};

export default SearchResult;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#7653ff',
		maxHeight: 300,
	},
});
