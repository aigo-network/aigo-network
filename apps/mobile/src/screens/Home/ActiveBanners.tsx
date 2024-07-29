import type { FC } from 'react';
import {
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { bannerMap } from './shared';

const ActiveBanners: FC = () => {
	const { remoteConfig } = useSnapshot(appState);

	return (
		<View>
			{remoteConfig.activeBanners.map((banner) => {
				const imgUrl = bannerMap[banner.id];

				return (
					<TouchableOpacity
						key={banner.id}
						onPress={() => banner.url && Linking.openURL(banner.url)}
					>
						<Image
							style={styles.banner}
							source={imgUrl}
							resizeMethod="resize"
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default ActiveBanners;

const styles = StyleSheet.create({
	banner: {
		maxWidth: '100%',
		height: 140,
		borderRadius: 20,
		overflow: 'hidden',
	},
});
