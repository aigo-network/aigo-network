import type { FC, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import SingleInput from './SingleInput';

interface Props {
	inputLength?: number;
	value?: string;
	style?: ViewStyle;
	errorMessage?: string;
	onChangeText?: (text: string) => void;
}

interface TextInputRef extends RefObject<TextInput> {}

const OtpInput: FC<Props> = ({
	inputLength = 6,
	value = '',
	style,
	errorMessage,
	onChangeText,
}) => {
	const inputRef: TextInputRef = useRef(null);
	const [innerValue, setInnerValue] = useState(value);
	const [isFocused, setIsFocused] = useState(inputRef.current?.isFocused());
	const handleChangeText = (text: string) => {
		setInnerValue(text);
		onChangeText?.(text);
	};
	const activeIndex = isFocused ? innerValue.length : -1;

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	return (
		<TouchableWithoutFeedback
			style={[styles.container, style]}
			onPress={() => inputRef.current?.focus()}
		>
			<TextInput
				style={styles.input}
				ref={inputRef}
				maxLength={inputLength}
				value={innerValue}
				onChangeText={handleChangeText}
				onFocus={() => {
					setIsFocused(true);
				}}
				onBlur={() => {
					setIsFocused(false);
				}}
				textContentType="oneTimeCode"
				keyboardType="number-pad"
			/>
			<View style={styles.singleInputContainer}>
				{Array.from({ length: inputLength }, (_, i) => i).map((index) => (
					<SingleInput
						key={index}
						index={index}
						activeIndex={activeIndex}
						value={innerValue[index]}
						isError={!!errorMessage}
					/>
				))}
			</View>
			<Text style={styles.errorText}>{errorMessage || ''}</Text>
		</TouchableWithoutFeedback>
	);
};

export default OtpInput;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		gap: 15,
	},
	input: {
		position: 'absolute',
		opacity: 0,
	},
	singleInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	errorText: {
		marginTop: 20,
		alignSelf: 'center',
		color: '#ff5c33',
		fontSize: 16,
	},
});
