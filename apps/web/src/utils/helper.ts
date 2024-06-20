export const isMobileBrowser = () => {
	const userAgent = navigator.userAgent;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		userAgent,
	);
};

export type OperatingSystem = 'iOS' | 'Android' | 'Unknown';

export const getMobileOperatingSystem = (): OperatingSystem => {
	/* eslint-disable-next-line */
	const window = global.window as any;
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(userAgent)) {
		return 'Android';
	}

	if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
		return 'iOS';
	}

	return 'Unknown';
};
