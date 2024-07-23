import { useEffect, useState } from 'react';
import { Camera as MapboxCamera } from '@rnmapbox/maps';

import { useCurrentCoordinate } from './shared';

export const Camera = () => {
	const { coordinate } = useCurrentCoordinate();
	const [innerCoordinate, setInnerCoordinate] = useState(coordinate);

	useEffect(() => {
		// only update camera coordinate by the first non-null value
		if (!innerCoordinate) setInnerCoordinate(coordinate);
	}, [coordinate]);

	return (
		<MapboxCamera
			centerCoordinate={innerCoordinate}
			zoomLevel={14}
			animationMode="moveTo"
		/>
	);
};

export default Camera;
