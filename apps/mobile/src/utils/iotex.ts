import { config } from '@aigo/config';

const metricEndpoint = 'https://api.depinscan.io/api/upload-device-metrics';

export type DePINScanPayload = {
	deviceId: string;
	latitude: number;
	longitude: number;
};

export const registerDePINScan = async ({
	deviceId,
	latitude,
	longitude,
}: DePINScanPayload) => {
	const payload = {
		uid: config.DEPIN_SCAN_PROJECT_ID, 
		events: [
			{
				publisher: deviceId,
				custom: {
					latitude,
					longitude,
				},
			},
		],
	};

	const rawResponse = await fetch(metricEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: config.DEPIN_SCAN_API_KEY,
		},
		body: JSON.stringify(payload),
	});

	return rawResponse.json();
};
