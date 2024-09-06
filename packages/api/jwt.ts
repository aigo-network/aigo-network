export let JWT: string;
export enum HeaderPrefixEnum {
	TELE_HASH = 'TeleHash',
	BEARER = 'Bearer',
}
export type GetJWTFunc = () => Promise<{
	jwt: string | undefined;
	headerPrefix: HeaderPrefixEnum;
}>;

export let getJWT: GetJWTFunc;

export const injectGetJWTFunc = (func: GetJWTFunc) => {
	getJWT = func;
};
