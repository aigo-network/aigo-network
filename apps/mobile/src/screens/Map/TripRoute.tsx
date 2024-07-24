import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { useMapState } from 'state/map';

import { emptyRoute } from './shared';

export const TripRoute = () => {
	const { currentTrip } = useMapState();

	return (
		<ShapeSource id="user-route" shape={currentTrip || emptyRoute}>
			<LineLayer id="user-route-layer-outer" style={routeStyles.outer} />
			<LineLayer id="user-route-layer" style={routeStyles.inner} />
		</ShapeSource>
	);
};

export default TripRoute;

export const routeStyles = {
	outer: {
		lineColor: '#BEB2EB80',
		lineWidth: 18,
	},
	inner: {
		lineColor: '#5932EA',
		lineWidth: 6,
	},
};
