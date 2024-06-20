export let JWT: string;

export type GetJWTFunc = () => Promise<string | undefined>;

export let getJWT: GetJWTFunc;

export const injectGetJWTFunc = (func: GetJWTFunc) => {
	getJWT = func;
};
