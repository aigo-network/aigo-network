import { Image, StyleSheet } from 'react-native';
import { MarkerView } from '@rnmapbox/maps';
import { appState } from 'state/app';
import { defaultAvatar } from 'utils/misc';
import { useSnapshot } from 'valtio';

import { useCurrentCoordinate } from './shared';

export const UserMarker = () => {
	const { appUser } = useSnapshot(appState);
	const { coordinate } = useCurrentCoordinate();

	if (!coordinate) return null;

	return (
		<MarkerView coordinate={coordinate}>
			<Image
				style={styles.avatar}
				source={{ uri: appUser?.imageUrl || defaultAvatar }}
			/>
		</MarkerView>
	);
};

export default UserMarker;

const styles = StyleSheet.create({
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
});
