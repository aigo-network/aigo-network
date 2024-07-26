/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This error type stands for any error related to map/location feature
 */
class MapError extends Error {
	constructor(message: any) {
		super(message);
		this.name = 'MapError';
	}
}

(global as any).MapError = MapError;
