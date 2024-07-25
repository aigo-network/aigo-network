export type GeolocationPermissionError = {
	code: number;
	message: string;
	PERMISSION_DENIED: number;
	POSITION_UNAVAILABLE: number;
	TIMEOUT: number;
};

export type RequestPermissionConfig = {
	onSuccess?: () => void;
	onDenied?: () => void;
	onUnavailable?: () => void;
};
