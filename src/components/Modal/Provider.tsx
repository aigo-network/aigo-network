import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSnapshot } from 'valtio';

import ModalContainer from './ModalContainer';
import { cleanModal, modalConfigMap } from './state';

type Props = {
	children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
	const configMap = useSnapshot(modalConfigMap);
	const configs = Object.values(configMap);
	const showBackdrop = configs.some((c) => c.showBackdrop);
	const [layout, setLayout] = useState<LayoutRectangle>();

	const handleLayoutChange = (e: LayoutChangeEvent) => {
		setLayout(e.nativeEvent.layout);
	};

	const handlePressBackdrop = () => {
		const { id } = configs[configs.length - 1];
		cleanModal(id);
	};

	return (
		<View style={styles.container} onLayout={handleLayoutChange}>
			{children}
			{showBackdrop && (
				<TouchableOpacity
					style={styles.backdrop}
					onPress={handlePressBackdrop}
				/>
			)}
			{configs.map((config) => {
				return (
					<ModalContainer
						config={config}
						key={config.id}
						parentLayout={layout}
					/>
				);
			})}
		</View>
	);
};

export default ModalProvider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backdrop: {
		position: 'absolute',
		backgroundColor: '#000',
		opacity: 0.4,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
