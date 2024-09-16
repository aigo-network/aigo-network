import { config } from '@aigo/config';

const metricEndpoint = 'https://api.depinscan.io/api/upload-device-metrics';

export type DePINScanPayload = {
	userId: string;
	deviceId: string;
	latitude: number;
	longitude: number;
};

export const registerDePINScan = ({
	userId,
	deviceId,
	latitude,
	longitude,
}: DePINScanPayload) => {
	return fetch(metricEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: config.DEPIN_SCAN_API_KEY,
		},
		body: JSON.stringify({
			uuid: userId,
			events: [
				{
					publisher: deviceId,
					custom: {
						latitude,
						longitude,
					},
				},
			],
		}),
	});
};
