import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

interface Props {
	children: ReactNode;
	aboveMaskComponent?: ReactNode;
	style?: ViewStyle;
	onKeyboardShow?: () => void;
	onKeyboardHide?: () => void;
}

const KeyboardView: FC<Props> = ({
	children,
	aboveMaskComponent,
	style,
	onKeyboardShow,
	onKeyboardHide,
}) => {
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			onKeyboardShow?.();
			setKeyboardShown(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			onKeyboardHide?.();
			setKeyboardShown(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<KeyboardAvoidingView
			style={[styles.container, style]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={20}
		>
			{children}
			{keyboardShown && (
				<View style={styles.keyboardLayer}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{ flex: 1 }} />
					</TouchableWithoutFeedback>
				</View>
			)}
			{aboveMaskComponent}
		</KeyboardAvoidingView>
	);
};

export default KeyboardView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardLayer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
