import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import CloseIcon from './icon/CloseIcon';
import SearchIcon from './icon/SearchIcon';

interface Props {
	textSearch?: string;
	onChangeText?: (text: string) => void;
	style?: ViewStyle;
}

export const SearchBox: FC<Props> = ({
	style,
	onChangeText,
	textSearch = '',
}) => {
	const [input, setInput] = useState(textSearch);

	useEffect(() => {
		onChangeText?.(input);
	}, [input]);

	useEffect(() => {
		setInput(textSearch);
	}, [textSearch]);

	return (
		<View style={[styles.container, style]}>
			<SearchIcon />
			<TextInput
				style={styles.input}
				placeholder="Search for a city"
				placeholderTextColor="#f4f4f4"
				value={input}
				onChangeText={(text) => {
					setInput(text);
				}}
				hitSlop={10}
			/>
			<TouchableOpacity hitSlop={10} onPress={() => setInput('')}>
				<CloseIcon />
			</TouchableOpacity>
		</View>
	);
};

export default SearchBox;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#afb2ff',
		borderRadius: 24,
		backgroundColor: '#7653FF',
	},
	input: {
		color: '#f4f4f4',
		fontSize: 16,
		lineHeight: 19,
		flex: 1,
	},
});
