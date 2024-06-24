import { envConfig } from '@aigo/config/env';
import Mapbox from '@rnmapbox/maps';

if (envConfig.MAPBOX_ACCESS_TOKEN) {
	Mapbox.setAccessToken(envConfig.MAPBOX_ACCESS_TOKEN);
} else {
	console.warn(
		'Missing MAPBOX_ACCESS_TOKEN, please setup to use Mapbox feature',
	);
}

// Temporarily disable Mapbox telemetry
// https://github.com/rnmapbox/maps/blob/main/docs/GettingStarted.md#disabling-telemetry
// https://www.mapbox.com/telemetry
Mapbox.setTelemetryEnabled(false);
