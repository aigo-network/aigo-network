'use client';

import type React from 'react';
import { useState } from 'react';
import { AppRegistry } from 'react-native';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

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
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styledComponentsStyles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		const reactNativeStyle = reactNativeApp.getStyleElement();
		return (
			<>
				{styledComponentsStyles}
				{reactNativeStyle}
			</>
		);
	});

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	);
}
