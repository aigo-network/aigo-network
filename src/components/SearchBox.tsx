import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import CloseIcon from './icon/CloseIcon';
import SearchIcon from './icon/SearchIcon';

interface Props extends TextInputProps {
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	iconColor?: string;
	textSearch?: string;
	onChangeText?: (text: string) => void;
}

export const SearchBox: FC<Props> = ({
	containerStyle,
	inputStyle,
	iconColor,
	textSearch = '',
	onChangeText,
	...props
}) => {
	const [input, setInput] = useState(textSearch);

	useEffect(() => {
		onChangeText?.(input);
	}, [input]);

	useEffect(() => {
		setInput(textSearch);
	}, [textSearch]);

	return (
		<View style={[styles.container, containerStyle]}>
			<SearchIcon color={iconColor} />
			<TextInput
				{...props}
				style={[styles.input, inputStyle]}
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
		borderWidth: 1,
		borderColor: '#afb2ff',
		borderRadius: 24,
		backgroundColor: '#7653FF',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		color: '#f4f4f4',
		fontSize: 16,
		lineHeight: 19,
		paddingVertical: 18,
	},
});
