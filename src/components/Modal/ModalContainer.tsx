import { type FC, Fragment, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import {
	calculatePosition,
	modalComponentMap,
	type ModalConfig,
} from './state';

type Props = {
	config: ModalConfig;
	parentLayout?: LayoutRectangle;
};

export const ModalContainer: FC<Props> = ({ config, parentLayout }) => {
	const component = modalComponentMap[config.id];
	const [layout, setLayout] = useState<LayoutRectangle>();

	if (!config.align) {
		return <Fragment key={config.id}>{component}</Fragment>;
	}

	const position =
		layout && parentLayout
			? calculatePosition(parentLayout, layout, config.align)
			: {};

	const handleLayout = (e: LayoutChangeEvent) => {
		setLayout(e.nativeEvent.layout);
	};

	return (
		<View
			style={[styles.alignmentContainer, position]}
			key={config.id}
			onLayout={handleLayout}
		>
			{component}
		</View>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	alignmentContainer: {
		position: 'absolute',
	},
});
