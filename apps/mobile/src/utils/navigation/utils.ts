import type { LinkingOptions } from '@react-navigation/native';
import wcmatch from 'wildcard-match';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkPrefixFromURL = (linking: LinkingOptions<any>, url: URL) => {
	const urlWithoutSearchAndPath = `${url.protocol}//${url.hostname}`;
	return linking.prefixes.some((prefix) => {
		return wcmatch(prefix)(urlWithoutSearchAndPath);
	});
};
