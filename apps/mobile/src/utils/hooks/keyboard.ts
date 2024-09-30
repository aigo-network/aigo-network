import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardStatus = () => {
	const [keyboardShowed, setKeyboardShowed] = useState(Keyboard.isVisible());

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () =>
			setKeyboardShowed(true),
		);
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
			setKeyboardShowed(false),
		);
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return { keyboardShowed };
};
