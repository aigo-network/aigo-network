import type { FC } from 'react';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { MapView as MapboxMapView } from '@rnmapbox/maps';

import Camera from './Camera';
import { useBouncedMapInsets } from './shared';
import TripRoute from './TripRoute';
import UserMarker from './UserMarker';

type Props = {
	onDidFinishLoadingMap?: () => void;
};

const MapView: FC<Props> = ({ onDidFinishLoadingMap }) => {
	const { scaleBarPosition } = useBouncedMapInsets();

	return (
		<MapboxMapView
			style={styles.container}
			scaleBarPosition={scaleBarPosition}
			onDidFinishLoadingMap={onDidFinishLoadingMap}
		>
			<Camera />
			<UserMarker />
			<TripRoute />
		</MapboxMapView>
	);
};

export default memo(MapView);

export const styles = StyleSheet.create({
	container: { flex: 1 },
});
