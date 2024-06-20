import { type FC } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import DownloadButton from './DownloadButton';
import type { DownloadOption } from './shared';

interface Props {
	links: DownloadOption[];
}

export const MobileInner: FC<Props> = ({ links }) => {
	const onDownloadPress = (item: DownloadOption) => {
		Linking.openURL(item.storeUrl);
	};

	return (
		<View style={styles.container}>
			{links.map((item) => {
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
