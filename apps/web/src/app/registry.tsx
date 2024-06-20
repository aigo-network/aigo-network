'use client';

import type React from 'react';
import { useState } from 'react';
import { AppRegistry } from 'react-native';
import { useServerInsertedHTML } from 'next/navigation';

export default function ReactNativeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [reactNativeApp] = useState(() => {
		AppRegistry.registerComponent('Main', () => () => null);
		// eslint-disable-next-line
		return (AppRegistry as any).getApplication('Main');
	});

	useServerInsertedHTML(() => {
		return reactNativeApp.getStyleElement();
	});

	return children;
}
