export const formatTimeDiffToHMS = (end: Date, start: Date) => {
	const timeDiff = end.valueOf() - start.valueOf();
	return new Date(timeDiff).toISOString().slice(11, 19);
};
