import type { FC } from 'react';
import { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { MapView as MapboxMapView } from '@rnmapbox/maps';

import Camera from './Camera';
import { useBouncedMapInsets } from './shared';
import TripRoute from './TripRoute';
import UserMarker from './UserMarker';

type Props = {
	style?: StyleProp<ViewStyle>;
	onDidFinishLoadingMap?: () => void;
};

const MapView: FC<Props> = ({ style, onDidFinishLoadingMap }) => {
	const { scaleBarPosition } = useBouncedMapInsets();

	return (
		<MapboxMapView
			style={style}
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
