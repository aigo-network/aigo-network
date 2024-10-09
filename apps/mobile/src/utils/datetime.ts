export const formatMsToHMS = (ms: number) => {
	return new Date(ms).toISOString().slice(11, 19);
};

export const formatTimeDiffToHMS = (end: Date, start: Date) => {
	const timeDiff = end.valueOf() - start.valueOf();
	return new Date(timeDiff).toISOString().slice(11, 19);
};

export const getThisWeekMonday = () => {
	const today = new Date().getDay();
	const toDate = new Date().getDate();
	const diff = toDate - today + (today === 0 ? -6 : 1);
	return new Date(new Date().setDate(diff));
};
