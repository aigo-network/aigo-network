export const formatMsToHMS = (ms: number) => {
	return new Date(ms).toISOString().slice(11, 19);
};

export const formatTimeDiffToHMS = (end: Date, start: Date) => {
	const timeDiff = end.valueOf() - start.valueOf();
	return new Date(timeDiff).toISOString().slice(11, 19);
};
