import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { cleanModal, modalComponentMap, modalConfigMap } from './state';

type Props = {
	children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
	const configMap = useSnapshot(modalConfigMap);
	const configs = Object.values(configMap);
	const showBackdrop = configs.some((c) => c.showBackdrop);

	const handlePressBackdrop = () => {
		const { id } = configs[configs.length - 1];
		cleanModal(id);
	};

	return (
		<View style={styles.container}>
			{children}
			{showBackdrop && (
				<TouchableOpacity
					style={styles.backdrop}
					onPress={handlePressBackdrop}
				/>
			)}
			{configs.map((config) => {
				const component = modalComponentMap[config.id];
				return <Fragment key={config.id}>{component}</Fragment>;
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
