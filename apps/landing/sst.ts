import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { getDomainNameByStage, hostedZone } from '../../tools/stacks/shared';

const landingAlias = {
	production: ' ',
	staging: 'staging.',
	development: 'dev.',
};

export const landing = ({ stack, app }: StackContext) => {
	const domainName = getDomainNameByStage(landingAlias[app.stage as never]);
	const site = new NextjsSite(stack, 'landing', {
		path: 'apps/landing',
		edge: true,
		timeout: '5 seconds',
		customDomain: {
			domainName,
			hostedZone,
		},
	});

	stack.addOutputs({
		url: site.url,
		domainName,
	});
};

export default landing;
