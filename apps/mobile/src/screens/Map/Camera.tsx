import { useEffect, useState } from 'react';
import { Camera as MapboxCamera } from '@rnmapbox/maps';

import { HCMLocation, useCurrentCoordinate } from './shared';

export const Camera = () => {
	const { coordinate } = useCurrentCoordinate();
	const [innerCoordinate, setInnerCoordinate] = useState(coordinate);

	useEffect(() => {
		// only update camera coordinate by the first non-null value
		if (coordinate && !innerCoordinate) setInnerCoordinate(coordinate);
	}, [coordinate]);

	return (
		<MapboxCamera
			defaultSettings={{ centerCoordinate: HCMLocation }}
			centerCoordinate={innerCoordinate}
			zoomLevel={14}
			animationMode="moveTo"
			pitch={33}
		/>
	);
};

export default Camera;
