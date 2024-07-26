import { envConfig } from '@aigo/config/env';
import MapboxClient from '@mapbox/mapbox-sdk';
import type { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import type { GeocodeResponse } from '@mapbox/mapbox-sdk/services/geocoding';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
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

const baseMapboxClient = MapboxClient({
	accessToken: envConfig.MAPBOX_ACCESS_TOKEN as string,
});

const mapboxGeocodingClient = MapboxGeocoding(baseMapboxClient);

export const queryReverseGeocode = (
	long: number,
	lat: number,
): Promise<MapiResponse<GeocodeResponse>> => {
	return mapboxGeocodingClient
		.reverseGeocode({
			query: [long, lat],
		})
		.send();
};
