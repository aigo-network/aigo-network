import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { modalComponentMap, modalConfigMap } from './state';

type Props = {
	children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
	const configMap = useSnapshot(modalConfigMap);
	const configs = Object.values(configMap);
	const showBackdrop = configs.some((c) => c.showBackdrop);

	return (
		<Fragment>
			{children}
			{showBackdrop && <View style={styles.backdrop}></View>}
			{configs.map((config) => {
				const component = modalComponentMap[config.id];
				return <Fragment key={config.id}>{component}</Fragment>;
			})}
		</Fragment>
	);
};

export default ModalProvider;

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		backgroundColor: '#000',
		opacity: 0.5,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
