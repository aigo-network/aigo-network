import type { FC } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import DownloadButton from './DownloadButton';
import type { StoreOption } from './shared';

interface Props {
	stores: StoreOption[];
	playStore: string;
	appStore: string;
}

export const MobileInner: FC<Props> = ({ stores, playStore, appStore }) => {
	const onDownloadPress = (item: StoreOption) => {
		Linking.openURL(item.type === 'Android' ? playStore : appStore);
	};

	return (
		<View style={styles.container}>
			{stores.map((item) => {
				return (
					<DownloadButton
						isActive
						key={item.title}
						item={item}
						onPress={onDownloadPress}
					/>
				);
			})}
		</View>
	);
};

export default MobileInner;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 18,
	},
});
