import type { FC, RefObject } from 'react';
import { useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import SingleInput from './SingleInput';

interface Props {
	inputLength?: number;
	value?: string;
	style?: ViewStyle;
	onChangeText?: (text: string) => void;
}

interface TextInputRef extends RefObject<TextInput> {}

const OtpInput: FC<Props> = ({
	inputLength = 6,
	value = '',
	style,
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
			/>
			{Array.from({ length: inputLength }, (_, i) => i).map((index) => (
				<SingleInput
					key={index}
					index={index}
					activeIndex={activeIndex}
					value={innerValue[index]}
				/>
			))}
		</TouchableWithoutFeedback>
	);
};

export default OtpInput;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		gap: 10,
	},
	input: {
		position: 'absolute',
		opacity: 0,
	},
	mask: {},
});
