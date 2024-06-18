import { NextjsSite, type StackContext } from 'sst/constructs';
export const webApp = ({ stack }: StackContext) => {
	const site = new NextjsSite(stack, 'web-app', {
		path: 'apps/web',
		edge: true,
	});

	stack.addOutputs({
		url: site.url,
	});
};

export default webApp;
